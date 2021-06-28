from app.models.base import Model

# For each valid DoJ, add a separate entry.
class Bus(Model):
    SCHEMA = {
        "bus_id": "bus_id int PRIMARY KEY",
        "departure": "departure datetime NOT NULL",
        "arrival": "arrival datetime NOT NULL",
        "source": "source int NOT NULL",
        "destination": "destination int NOT NULL",
        "!fk1": "foreign key (`source`) references BusStop (`stop_id`)",
        "!fk2": "foreign key (`destination`) references BusStop (`stop_id`)"
    }


class BusSeat(Model):
    SCHEMA = {
        "bus_id": "bus_id int",
        "seat_type": "seat_type ENUM ('Window', 'Aisle', 'Middle')",
        "seat_no": "seat_no int",
        "fare": "fare decimal(5,2) NOT NULL",
        "!pk": "PRIMARY KEY (`bus_id`,`seat_no`)",
        "!fk1": "FOREIGN KEY (`bus_id`) REFERENCES Bus (`bus_id`)"
    }


class BusBooking(Model):
    SCHEMA = {
        "user_id": "user_id int not null",
        "bus_id": "bus_id int not null",
        "date_of_booking": "date_of_booking datetime not null default(current_timestamp())",
        "seat_no": "seat_no int not null",
        "special_request": "special_request varchar(255)",
        "amount": "amount decimal(5,2) not null",
        "is_paid": "is_paid boolean default 0",
        "!fk1": "foreign key (`user_id`) references User (`user_id`)",
        "!fk2": "foreign key (`bus_id`, `seat_no`) references BusSeat (`bus_id`, `seat_no`)",
        "!pk": "PRIMARY KEY(user_id, bus_id, seat_no)"
    }