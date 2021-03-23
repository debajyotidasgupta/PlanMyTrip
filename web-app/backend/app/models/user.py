from flask_login import UserMixin
from app.models.base import Model, Query

class User(Model, UserMixin):
    SCHEMA = {
        "user_id": "user_id int PRIMARY KEY AUTO_INCREMENT",
        "name": "name varchar(255) NOT NULL",
        "email": "email varchar(255) NOT NULL UNIQUE",
        "phone": "phone int",
        "user_type": "user_type ENUM ('general', 'business')",
        "dob": "dob date NOT NULL",
        "rating": "rating decimal",
        "password": "password varchar(255) NOT NULL"
    }

    def get_id(self):
        # Flask Login boilerplate
        return str(self.user_id)





class UserAddress(Model):
    SCHEMA = {
        "user_id": "user_id int",
        "address_id": "address_id int",
        "!fk1": "foreign key (user_id) references User (user_id)",
        "!fk2": "foreign key (address_id) references Address (address_id)",
        "!pk": "primary key (user_id, address_id)"
    }


class SavedCards(Model):
    SCHEMA = {
        "user_id": "user_id int",
        "card_no": "card_no int",
        "name_on_card": "name_on_card varchar(255) NOT NULL",
        "date_of_expiry": "date_of_expiry date NOT NULL",
        "!pk": "PRIMARY KEY (user_id, card_no)",
        "!fk": "FOREIGN KEY (user_id) REFERENCES User (user_id)"
    }