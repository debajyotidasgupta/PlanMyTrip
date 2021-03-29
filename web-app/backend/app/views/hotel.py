from datetime import datetime
from uuid import uuid4

from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required, current_user

from app.models.base import Query, Transaction

api = Namespace("hotel", description="Hotel Booking System")

hotel = api.model('Hotel', {
    'hotel_id': fields.Integer('Id of the hotel to book'),
    'room_no': fields.Integer('Room no to book'),
    'start_date': fields.Date(),
    'end_date': fields.Date(),
    'no_of_persons': fields.Integer('Number of person you are booking for')
})

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


    @login_required
    def get(self):
        usr = current_user
        query = """
        SELECT hb.booking_id, h.hotel_name, hb.room_no,
        DATE_FORMAT(hb.start_date, '%Y-%m-%d') AS start_date,
        DATE_FORMAT(hb.end_date, '%Y-%m-%d') AS end_date,
        DATE_FORMAT(hb.date_of_booking, '%Y-%m-%d') AS date_of_booking
        FROM HotelBooking hb
        JOIN Hotel h ON hb.hotel_id = h.hotel_id
        WHERE hb.user_id = {};
        """
        q = Query(query=query)
        return {
            "bookings": q.getAll(usr.user_id)
        }


    @api.doc(params={
        'booking_id': "Booking Id to delete"
    })
    @login_required
    def delete(self):
        usr = current_user
        booking_id = request.args.get("booking_id")

        query = """
        DELETE FROM HotelBooking
        WHERE booking_id = '{}'
        AND user_id = {};
        """.format(booking_id, usr.user_id)

        tx = Transaction(query=query)
        
        try:
            tx.execute()
            return {
                "message": "Booking deleted"
            }, 201
        except Exception as e:
            return {
                "message": str(e)
            }, 403