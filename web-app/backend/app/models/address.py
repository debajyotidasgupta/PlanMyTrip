from app.models.base import Model

class Address(Model):
    SCHEMA = {
        "address_id": "address_id int primary key",
        "address_line_1": "address_line_1 varchar(255) not null",
        "address_line_2": "address_line_2 varchar(255)",
        "pincode": "pincode int not null",
        "landmark": "landmark varchar(255)",
        "city": "city varchar(255) not null",
        "state": "state varchar(255) not null",
        "country": "country varchar(255) not null"
    }