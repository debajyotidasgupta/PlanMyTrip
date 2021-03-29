from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_user, logout_user, login_required

from app.model.hotel import Hotel, Room, HotelBooking

api = Namespace("hotel", description="Hotel Booking System")

@api.route('/')
class Hotel():
    def post(self):
        form = request.form

        res = Query('\
        SELECT * FROM Hotel \
        INNER JOIN Address \
        ON Hotel.address_id=Address.address_id\
        ', model=Hotel)

        return {
            'message': 'Data fetched successfully',
            'hotels': res.getAll()
        }, 200