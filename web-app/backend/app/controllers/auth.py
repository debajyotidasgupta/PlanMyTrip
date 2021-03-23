from bcrypt import hashpw, checkpw, gensalt
from flask_login import LoginManager
from app.models.user import User
from app.models.base import Query


login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    q = Query("SELECT * FROM User WHERE user_id = {}", model=User)
    usr = q.getOne(user_id)
    return usr

 
def hash_password(pwd):
    return hashpw(pwd.encode(), gensalt())


def check_password(pwd, hsh):
    return checkpw(pwd.encode(), hsh.encode())


def create_user(req):
    req["password"] = hash_password(req["password"])
    usr = User(**req)
    usr.save()


def get_user_from_email(email):
    q = Query("SELECT * FROM User WHERE email = '{}'", model=User)
    usr = q.getOne(email)
    assert usr is not None

    return usr