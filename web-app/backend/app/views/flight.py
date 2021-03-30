from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required, current_user

from app.models.base import Query, Transaction
from app.models.flight import Flight, FlightSeat, FlightBooking
from app.models.boarding_points import Airport
from app.models.address import Address

from datetime import datetime

api = Namespace('flight',description='Flight Booking system')

flight = api.model('Flight', {
    'flight_id': fields.Integer('Id of the flight to book'),
    'airlines': fields.String(),
    'departure': fields.Date(),
    'seat_type': fields.String(),
    'seats': fields.Integer('No of seats'),
    'fare': fields.Float('Fare of each seat')
})

booking = api.model('FlightBooking',{
    'flight_id' : fields.Integer('Id of flight'),
    'seat_no' : fields.Integer('Seat no')
})

@api.route('/')
class FlightGet(Resource):
    @api.doc(params={
        'from': 'Source Airport',
        'to': 'Destination Airport',
        'date_of_journey': 'Date of Journey',
        'ticket_class': 'Ticket Class',
        'passengers': 'Number of passengers'
    })

    def get(self):
        from_airport = request.args.get('from')
        to_airport = request.args.get('to')
        date_of_journey = request.args.get('date_of_journey')
        ticket_class = request.args.get('ticket_class')
        passengers = int(request.args.get('passengers'))

        print("doj=",date_of_journey)
        query = """
        SELECT f.flight_id, f.airlines, DATE_FORMAT(f.departure, '%Y-%m-%d') AS departure, fs.seat_type, CAST(fs.fare AS CHAR(10)) AS fare, COUNT(DISTINCT fs.seat_no) AS seats
        FROM Flight f, FlightSeat fs, Address ads, Address addd, Airport aps, Airport apd
        WHERE f.source = aps.airport_id AND f.destination = apd.airport_id
        AND aps.airport_id=ads.address_id AND apd.airport_id=addd.address_id
        AND ads.city = '{}' AND addd.city = '{}'
        AND f.departure = '{}'
        AND fs.seat_type = '{}'
        AND f.flight_id = fs.flight_id
        AND (f.flight_id,fs.seat_no) NOT IN (SELECT fb.flight_id, fb.seat_no FROM FlightBooking fb)
        GROUP BY f.flight_id, f.airlines, f.departure, fs.fare, fs.seat_type
        HAVING COUNT(DISTINCT fs.seat_no) >= {}
        ORDER BY f.departure, f.airlines, fs.fare
        """

        res = Query(query=query)

        return {
            "flights" : [a for a in res.getAll(from_airport,to_airport,date_of_journey,ticket_class,passengers)]
        }

@api.route("/booking")
class FlightBook(Resource):
    @api.expect(flight, validate=True)
    @login_required
    def post(self):
        usr = current_user
        flight_id = api.payload['flight_id']
        airlines = api.payload['airlines']
        departure = api.payload['departure']
        seat_type = api.payload['seat_type']
        seats = int(api.payload['seats'])
        fare = float(api.payload['fare'])

        q1 = """
        SELECT fs.flight_id, fs.seat_no FROM Flight f, FlightSeat fs
        WHERE f.flight_id = fs.flight_id
        AND f.flight_id = {}
        AND f.airlines = '{}'
        AND f.departure = '{}'
        AND fs.seat_type = '{}'
        AND fs.fare = {}
        AND (fs.flight_id, fs.seat_no) NOT IN
        (SELECT flight_id, seat_no FROM FlightBooking) 
        LIMIT {}
        """

        res = Query(query=q1)
        seats = [a for a in res.getAll(flight_id,airlines,departure,seat_type,fare,seats)]

        q2 = []

        now = datetime.now().strftime("%Y-%m-%d")
        for s in seats:
            q2.append(
            "INSERT INTO FlightBooking VALUES ({},{},{},'{}',NULL,{:.2f},FALSE);"\
                .format(usr.user_id,s['flight_id'],s['seat_no'],now,fare))

        tx = Transaction(query=q2)
        try:
            tx.execute()
            q3 = []
            for s in seats:
                q3.append(
                    "SELECT flight_id, seat_no FROM FlightBooking WHERE flight_id={} AND user_id={} AND seat_no={}"\
                        .format(s['flight_id'],usr.user_id,s['seat_no'])
                )
            results = []
            for qry in q3:
                ress = Query(query=qry)
                results.append(ress.getOne())
            print("results")
            print(results)
            return {
                "bookings": results
            }, 201
        except Exception as e:
            print(e)
            return {
                "message": "Booking failed"
            }, 403

@api.route("/payment")
class FlightBookPayment(Resource):
    @api.expect([booking], validate=True)
    @login_required
    def post(self):
        usr = current_user
        bookings = api.payload['bookings']

        q1 = """
        UPDATE FlightBooking
        SET is_paid=TRUE
        WHERE user_id={} AND flight_id ={} AND seat_no={}
        """
        try:
            for booking in bookings:
                Query(query=q1.format(usr.user_id,booking['flight_id'],booking['seat_no']))
            return {
                "message": "Payment successful"
            }, 200
        except Exception as e:
            return {
                "message": "Payment failed"
            }, 400