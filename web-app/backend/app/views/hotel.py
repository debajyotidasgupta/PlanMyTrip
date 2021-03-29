from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required

from app.models.base import Query
from app.models.hotel import Hotel

api = Namespace("hotel", description="Hotel Booking System")

@api.route('/')
class HotelGet(Resource):
    @api.doc(params={
        'city': 'City of hotel',
        'start_date': 'Booking Start Date',
        'end_date': 'Booking End Date'
    })
    def get(self):
        city = request.args.get('city')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')


        query = """
        SELECT h.hotel_id, h.hotel_name, a.address_line_1, a.address_line_2, a.city, a.state, a.country, a.pincode
        FROM Hotel h
        JOIN Address a ON a.address_id = h.address_id
        LEFT JOIN Room r ON h.hotel_id = r.hotel_id
        LEFT JOIN HotelBooking hb ON h.hotel_id = hb.hotel_id
        WHERE a.city = '{}' AND (NOT (hb.end_date < '{}' OR hb.start_date > '{}') OR ISNULL(hb.start_date))
        GROUP BY h.hotel_id
        HAVING COUNT(DISTINCT r.room_no) > COUNT(DISTINCT hb.room_no)
        """

        res = Query(query=query)
        return {
            "hotels": [a for a in res.getAll(city, start_date, end_date)]
        }