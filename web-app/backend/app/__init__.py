from flask import Flask, g

from app.config import CONFIG
from app.models import db
from app.views.cli import db_cli



app = Flask(__name__)

db.app = app
db.init_app(app)
app.config.from_mapping(**CONFIG)

app.cli.add_command(db_cli)

__all__ = ["app"]