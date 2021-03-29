from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

from app.config import CONFIG
from app.models import db
from app.views.cli import db_cli
from app.controllers.auth import login_manager
from app.views.auth import api as authNS



app = Flask(__name__)

db.app = app
db.init_app(app)
login_manager.init_app(app)
app.config.from_mapping(**CONFIG)
cors = CORS(app,supports_credentials=True)

api = Api(app)

api.add_namespace(authNS, path="/auth")


app.cli.add_command(db_cli)

__all__ = ["app"]