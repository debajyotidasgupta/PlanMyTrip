from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

from app.config import CONFIG
from app.models import db
from app.views.cli import db_cli
from app.controllers.auth import login_manager
from app.views.auth import api as authNS
from app.views.blog import api as blogNS
from app.views.hotel import api as hotelNS
from app.views.airport import api as airportNS
from app.views.flight import api as flightNS



app = Flask(__name__)

db.app = app
db.init_app(app)
login_manager.init_app(app)
app.config.from_mapping(**CONFIG)
cors = CORS(app, supports_credentials=True)

api = Api(app)

api.add_namespace(authNS, path="/auth")
api.add_namespace(blogNS, path="/blog")
api.add_namespace(hotelNS, path="/hotel")
api.add_namespace(airportNS, path='/airport')
api.add_namespace(flightNS, path='/flight')

app.cli.add_command(db_cli)

__all__ = ["app"]