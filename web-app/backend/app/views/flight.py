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
        SELECT f.flight_id, f.airlines, fs.seat_type, COUNT(DISTINCT fs.seat_no)
        FROM Flight f, FlightSeat fs, Address ads, Address addd, Airport aps, Airport apd
        WHERE f.source = aps.airport_id AND f.destination = apd.airport_id
        AND aps.airport_id=ads.address_id AND apd.airport_id=addd.address_id
        AND ads.city = '{}' AND addd.city = '{}'
        AND f.departure = '{}'
        AND fs.seat_type = '{}'
        AND f.flight_id = fs.flight_id
        AND (f.flight_id,fs.seat_no) NOT IN (SELECT fb.flight_id, fb.seat_no FROM FlightBooking fb)
        GROUP BY f.flight_id, f.airlines, fs.seat_type
        HAVING COUNT(DISTINCT fs.seat_no) >= {}
        """

        res = Query(query=query)

        return {
            "flights" : [a for a in res.getAll(from_airport,to_airport,date_of_journey,ticket_class,passengers)]
        }