from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required

from app.models.base import Query
from app.models.flight import Flight
from app.models.boarding_points import Airport
from app.models.address import Address

api = Namespace("airport",description="Airports")

@api.route('/')
class AirportList(Resource):
    def get(self):
        query ="""
        SELECT ad.city FROM Airport air
        JOIN Address ad ON air.address_id = ad.address_id
        """

        res = Query(query=query)
        return {
            "airports": [a for a in res.getAll()]
        }

