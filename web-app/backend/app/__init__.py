from flask import Flask

from app.config import CONFIG
from app.models import db
from app.views.cli import db_cli
from app.controllers.auth import login_manager



app = Flask(__name__)

db.app = app
db.init_app(app)
app.config.from_mapping(**CONFIG)
login_manager.init_app(app)


app.cli.add_command(db_cli)

__all__ = ["app"]