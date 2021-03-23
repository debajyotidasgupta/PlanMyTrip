from app.models.base import Model


class Airport(Model):
    SCHEMA = {
        "airport_id": "airport_id int PRIMARY KEY",
        "airport_type": "airport_type ENUM('domestic', 'international')",
        "address_id": "address_id int NOT NULL",
        "no_of_counters": "no_of_counters int",
        "!fk1": "FOREIGN KEY (`address_id`) REFERENCES Address (`address_id`)"
    }


class RailStation(Model):
    SCHEMA = {
        "station_id": "station_id int PRIMARY KEY",
        "station_type": "station_type ENUM('normal', 'junction')",
        "address_id": "address_id int NOT NULL",
        "no_of_platforms": "no_of_platforms int",
        "!fk1": "FOREIGN KEY (`address_id`) REFERENCES Address (`address_id`)"
    }


class BusStop(Model):
    SCHEMA = {
        "stop_id": "stop_id int PRIMARY KEY",
        "stop_type": "stop_type ENUM('state', 'local')",
        "address_id": "address_id int NOT NULL",
        "!fk1": "FOREIGN KEY (`address_id`) REFERENCES Address (`address_id`)"
    }


class Dock(Model):
    SCHEMA = {
        "dock_id": "dock_id int PRIMARY KEY",
        "dock_type": "dock_type ENUM('river', 'sea')",
        "address_id": "address_id int NOT NULL",
        "!fk1": "FOREIGN KEY (`address_id`) REFERENCES Address (`address_id`)"
    }