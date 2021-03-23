from app.models.base import Model


class Flight(Model):
    SCHEMA = {
        "flight_id": "flight_id int PRIMARY KEY",
        "airlines": "airlines varchar(255) NOT NULL",
        "departure": "departure datetime NOT NULL",
        "arrival": "arrival datetime NOT NULL",
        "source": "source int NOT NULL",
        "destination": "destination int NOT NULL",
        "discount": "discount int",
        "!fk1": "FOREIGN KEY (`source`) REFERENCES Airport (`airport_id`)",
        "!fk2": "FOREIGN KEY (`destination`) REFERENCES Airport (`airport_id`)"
    }


class FlightSeat(Model):
    SCHEMA = {
        "flight_id": "flight_id int NOT NULL",
        "seat_type": "seat_type ENUM ('premium_business_class', 'business_class', 'first_class', 'economy')",
        "seat_no": "seat_no int NOT NULL",
        "luggage_allowed": "luggage_allowed int",
        "fare": "fare decimal(6,2) NOT NULL",
        "!pk": "PRIMARY KEY (`flight_id`, `seat_no`)",
        "!fk1": "FOREIGN KEY (`flight_id`) REFERENCES Flight (`flight_id`)"
    }


class FlightBooking(Model):
    SCHEMA = {
        "user_id": "user_id int NOT NULL",
        "flight_id": "flight_id int NOT NULL",
        "seat_no": "seat_no int NOT NULL",
        "date_of_booking": "date_of_booking datetime NOT NULL",
        "special_request": "special_request varchar(255)",
        "amount": "amount decimal(10,2) NOT NULL",
        "is_paid": "is_paid boolean NOT NULL",
        "!fk1": "FOREIGN KEY (`user_id`) REFERENCES User (`user_id`)",
        "!fk2": "FOREIGN KEY (`flight_id`,`seat_no`) REFERENCES FlightSeat (`flight_id`,`seat_no`)",
        "!pk": "PRIMARY KEY (user_id, flight_id, seat_no)"
    }