from app.models.base import Model


class TouristSpot(Model):
    SCHEMA = {
        "tourist_spot_id": "tourist_spot_id int PRIMARY KEY",
        "tourist_spot_name": "tourist_spot_name varchar(255) not null",
        "visiting_start": "visting_start time not null",
        "visiting_end": "visting_end time not null",
        "address_id": "address_id int NOT NULL",
        "!fk1": "FOREIGN KEY (`address_id`) REFERENCES Address (`address_id`)"
    }


class TouristSpotBooking(Model):
    SCHEMA = {
        "booking_id": "booking_id int PRIMARY KEY",
        "user_id": "user_id int not null",
        "tourist_spot_id": "tourist_spot_id int not null",
        "date_of_booking": "date_of_booking datetime",
        "valid_to": "valid_to datetime default(current_timestamp()+200)",
        "amount": "amount decimal(5,2) not null",
        "is_piad": "is_paid bool default 0",
        "!fk1": "foreign key (`user_id`) references User (`user_id`)",
        "!fk2": "foreign key (`tourist_spot_id`) references TouristSpot (`tourist_spot_id`)"
    }