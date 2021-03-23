from app.models.hotel import HotelBooking
from app.models.base import db
from app.models.user import User, UserAddress, SavedCards
from app.models.address import Address
from app.models.hotel import Hotel, Room, HotelBooking
from app.models.boarding_points import Airport, RailStation, BusStop, Dock
from app.models.blog import Blog, Comment
from app.models.tourist_spot import TouristSpot, TouristSpotBooking
from app.models.bus import Bus, BusSeat, BusBooking
from app.models.flight import Flight, FlightSeat, FlightBooking
from app.models.train import Train, TrainSeat, TrainBooking
from app.models.cruise import Cruise, CruiseRoom, CruiseBooking


# Ordering is important here
MODELS = [
    Address,
    User,
    UserAddress,
    SavedCards,
    Blog,
    Comment,
    Hotel,
    Room,
    HotelBooking,
    Airport,
    RailStation,
    BusStop,
    Dock,
    TouristSpot,
    TouristSpotBooking,
    Bus,
    BusSeat,
    BusBooking,
    Flight,
    FlightSeat,
    FlightBooking,
    Train,
    TrainSeat,
    TrainBooking,
    Cruise,
    CruiseRoom,
    CruiseBooking
]

def migrate():
    global MODELS
    for model in MODELS:
        model.createTable()


def dropAll():
    global MODELS
    for model in reversed(MODELS):
        model.dropTable()