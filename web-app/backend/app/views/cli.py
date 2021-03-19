from flask.cli import AppGroup
from app.models import migrate, dropAll

db_cli = AppGroup('db')

migrate = db_cli.command('migrate')(migrate)
dropAll = db_cli.command('dropall')(dropAll)
