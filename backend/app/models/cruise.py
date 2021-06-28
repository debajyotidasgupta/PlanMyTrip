from app.models.base import Model


class Cruise(Model):
    SCHEMA = {
        "cruise_id": "cruise_id int PRIMARY KEY",
        "cruise_name": "cruise_name varchar(255) NOT NULL",
        "departure": "departure datetime NOT NULL",
        "arrival": "arrival datetime NOT NULL",
        "source": "source int NOT NULL",
        "destination": "destination int NOT NULL",
        "rating": "rating float",
        "discount": "discount int",
        "!fk1": "FOREIGN KEY (`source`) REFERENCES Dock (`dock_id`)",
        "!fk2": "FOREIGN KEY (`destination`) REFERENCES Dock (`dock_id`)"
    }


class CruiseRoom(Model):
    SCHEMA = {
        "cruise_id": "cruise_id int NOT NULL",
        "room_type": "room_type ENUM ('delux', 'super_delux', 'double_bed', 'single_bed', 'suite')",
        "room_no": "room_no int NOT NULL",
        "cost": "cost decimal(7,2) NOT NULL",
        "description": "description varchar(255)",
        "!pk": "PRIMARY KEY (`cruise_id`, `room_no`)",
        "!fk1": "FOREIGN KEY (cruise_id) REFERENCES Cruise (cruise_id)"
    }


class CruiseBooking(Model):
    SCHEMA = {
        "user_id": "user_id int NOT NULL",
        "cruise_id": "cruise_id int NOT NULL",
        "room_no": "room_no int NOT NULL",
        "date_of_booking": "date_of_booking datetime NOT NULL",
        "no_of_persons": "no_of_persons int NOT NULL",
        "special_request": "special_request varchar(255)",
        "amount": "amount decimal(10,2) NOT NULL",
        "is_paid": "is_paid boolean NOT NULL DEFAULT 0",
        "!fk1": "FOREIGN KEY (`user_id`) REFERENCES User (`user_id`)",
        "!fk2": "FOREIGN KEY (`cruise_id`,`room_no`) REFERENCES CruiseRoom (`cruise_id`,`room_no`)",
        "!pk": "PRIMARY KEY (user_id, cruise_id, room_no)"
    }