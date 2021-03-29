from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required

from app.models.base import Query
from app.models.flight import Flight, FlightSeat
from app.models.boarding_points import Airport
from app.models.address import Address

api = Namespace('flight',description='Flight Booking system')

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

        query = """
        SELECT f.flight_id, f.airlines, f.departure, fs.seat_type, f.fare, COUNT(DISTINCT fs.seat_no) AS seats
        FROM Flight f, FlightSeat fs, Address ads, Address addd, Airport aps, Airport apd
        WHERE f.source = aps.airport_id AND f.destination = apd.airport_id
        AND aps.airport_id=ads.address_id AND apd.airport_id=addd.address_id
        AND ads.city = '{}' AND addd.city = '{}'
        AND f.departure >= '{}'
        AND fs.seat_type = '{}'
        AND f.flight_id = fs.flight_id
        AND (f.flight_id,fs.seat_no) NOT IN (SELECT fb.flight_id, fb.seat_no FROM FlightBooking fb)
        GROUP BY f.flight_id, f.airlines, f.departure, f.fare, fs.seat_type
        HAVING COUNT(DISTINCT fs.seat_no) >= {}
        ORDER BY f.departure, f.airlines, f.fare
        """

        res = Query(query=query)

        return {
            "flights" : [a for a in res.getAll(from_airport,to_airport,date_of_journey,ticket_class,passengers)]
        }

@api.route("/booking")
class HotelBook(Resource):
    @api.expect(hotel, validate=True)
    @login_required
    def post(self):
        usr = current_user
        hotel_id = api.payload['hotel_id']
        room_no = api.payload['room_no']
        q = Query("SELECT cost FROM Room WHERE hotel_id = {} AND room_no = {}")
        cost = q.getOne(hotel_id, room_no)['cost']
        
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