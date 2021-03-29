from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required, current_user

from app.models.base import Query, Transaction
from app.models.flight import Flight, FlightSeat, FlightBooking
from app.models.boarding_points import Airport
from app.models.address import Address

api = Namespace('flight',description='Flight Booking system')

# user_id: localStorage.getItem('user_id'),
        # flight_id : this.state.flight.flight_id,
        # airlines: this.state.flight.airlines,
        # departure: this.state.flight.departure,
        # seat_type: this.state.flight.seat_type,
        # seats: this.state.seats,
        # totalFare: this.state.totalFare,

flight = api.model('Flight', {
    'flight_id': fields.Integer('Id of the flight to book'),
    'airlines': fields.Integer('Airlines of the flight to book'),
    'departure': fields.Date(),
    'seat_type': fields.String(),
    'seats': fields.Integer('No of seats'),
    'totalFare': fields.Float('Total Fare')
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
        SELECT fs.flight_id, fs.seat_no, FROM Flight f, FLightSeat fs
        WHERE f.flight_id = fs.flight_id
        AND f.flight_id = {}
        AND f.airlines = '{}'
        AND f.departure = '{}'
        AND fs.seat_type = '{}'
        AND fs.fare = {}
        """
        flights = q1.getAll(departure)
        
        start_date = api.payload['start_date']
        end_date = api.payload['end_date']

        days = datetime.strptime(end_date, "%Y-%m-%d") - datetime.strptime(start_date, "%Y-%m-%d")

        if days.days <= 0:
            return {
                "message": "Invalid input"
            }, 403

        amount = cost * days.days
        no_of_persons = api.payload['no_of_persons']
        booking_id = uuid4()

        query = [
            "SELECT COUNT(*) INTO @cnt FROM HotelBooking\
                WHERE hotel_id = {} AND room_no = {}\
                AND NOT (start_date > '{}' OR end_date < '{}');"\
                    .format(hotel_id, room_no, end_date, start_date),
            
            "INSERT INTO HotelBooking VALUES (\
                IF(@cnt > 0, -1, {}), {}, {}, CURRENT_TIMESTAMP(),\
                '{}', '{}', {}, 'All is well',\
                {}, 0, '{}');"\
                    .format(usr.user_id, hotel_id, room_no, start_date,
                    end_date, no_of_persons, amount, booking_id)
        ]

        tx = Transaction(query=query)
        try:
            tx.execute()
            q = Query("SELECT booking_id FROM HotelBooking WHERE booking_id = '{}';")
            res = q.getAll(booking_id)
            assert len(res) == 1
            return {
                "message": "Booking successful"
            }, 201
        except Exception as e:
            return {
                "message": "Booking failed"
            }, 403