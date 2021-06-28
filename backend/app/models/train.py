from app.models.base import Model


class Train(Model):
    SCHEMA = {
        "train_id": "train_id int PRIMARY KEY",
        "train_name": "train_name varchar(255)",
        "departure": "departure datetime",
        "arrival": "arrival datetime",
        "source": "source int NOT NULL",
        "destination": "destination int NOT NULL",
        "!fk1": "FOREIGN KEY (`source`) REFERENCES RailStation (`station_id`)",
        "!fk2": "FOREIGN KEY (`destination`) REFERENCES RailStation (`station_id`)"
    }


class TrainSeat(Model):
    SCHEMA = {
        "train_id": "train_id int NOT NULL",
        "seat_type": "seat_type ENUM ('AC_ChairCar', 'AC_Sleeper', 'ChairCar', 'Sleeper', 'General')",
        "seat_no": "seat_no int",
        "fare": "fare decimal(5,2) NOT NULL",
        "!pk": "PRIMARY KEY (`train_id`, `seat_no`)",
        "!fk1": "FOREIGN KEY (`train_id`) REFERENCES Train (`train_id`) ON DELETE CASCADE"
    }


class TrainBooking(Model):
    SCHEMA = {
        "user_id": "user_id int NOT NULL",
        "train_id": "train_id int NOT NULL",
        "seat_no": "seat_no int NOT NULL",
        "date_of_booking": "date_of_booking datetime NOT NULL",
        "special_request": "special_request varchar(255)",
        "amount": "amount decimal(5,2) NOT NULL",
        "is_paid": "is_paid boolean NOT NULL DEFAULT 0",
        "!fk1": "FOREIGN KEY (`user_id`) REFERENCES User (`user_id`)",
        "!fk2": "FOREIGN KEY (`train_id`,`seat_no`) REFERENCES TrainSeat (`train_id`,`seat_no`)"
    }