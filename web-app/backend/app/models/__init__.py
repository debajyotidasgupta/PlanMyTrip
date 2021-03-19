from app.models.base import db
from app.models.user import User, UserAddress, SavedCards
from app.models.address import Address

# Ordering is important here
MODELS = [
    Address,
    User,
    UserAddress,
    SavedCards
]

def migrate():
    global MODELS
    for model in MODELS:
        model.createTable()


def dropAll():
    global MODELS
    for model in reversed(MODELS):
        model.dropTable()