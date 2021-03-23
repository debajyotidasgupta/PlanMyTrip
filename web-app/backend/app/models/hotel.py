from app.models.base import Model


class Hotel(Model):
    SCHEMA = {
        "hotel_id": "hotel_id int PRIMARY KEY",
        "hotel_name": "hotel_name varchar(255) NOT NULL",
        "address_id": "address_id int NOT NULL",
        "rating": "rating int",
        "discount": "discount int",
        "!fk1": "foreign key (address_id) references Address (address_id)"
    }


class Room(Model):
    SCHEMA = {
        "hotel_id": "hotel_id int",
        "room_type": "room_type ENUM ('delux', 'super_delux', 'double_bed', 'single_bed', 'suite')",
        "room_no": "room_no int",
        "cost": "cost decimal(7,2) NOT NULL",
        "description": "description varchar(255)",
        "!pk": "PRIMARY KEY (`hotel_id`, `room_no`)",
        "!fk1": "foreign key (`hotel_id`) references Hotel (`hotel_id`)"
    }


class HotelBooking(Model):
    SCHEMA = {
        "user_id": "user_id int NOT NULL",
        "hotel_id": "hotel_id int NOT NULL",
        "room_no": "room_no int NOT NULL",
        "date_of_booking": "date_of_booking datetime NOT NULL",
        "start_date": "start_date datetime NOT NULL",
        "end_date": "end_date datetime NOT NULL",
        "no_of_persons": "no_of_persons int NOT NULL",
        "special_request": "special_request varchar(255)",
        "amount": "amount decimal(10,2) NOT NULL",
        "is_paid": "is_paid boolean NOT NULL DEFAULT 0",
        "!pk": "PRIMARY KEY (user_id, hotel_id, room_no, start_date, end_date)",
        "!fk1": "FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE",
        "!fk2": "FOREIGN KEY (hotel_id, room_no) REFERENCES Room (hotel_id, room_no) ON DELETE CASCADE"
    }