from flask_restplus import Namespace, Resource, fields
from flask_login import login_user, logout_user, login_required

from app.controllers.auth import create_user, check_password, get_user_from_email

api = Namespace("auth", description="User login system")

userlogin = api.model("UserLogin", {
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})

user = api.model('User', {
    'email': fields.String(required=True),
    'password': fields.String(required=True),
    'name': fields.String(required=True),
    'dob': fields.Date(required=True)
})


@api.route("/register")
class RegisterUser(Resource):
    @api.expect(user, validate=True)
    def post(self):
        try:
            create_user(api.payload)
            return {
                "message": "User created"
            }, 201
        except Exception as e:
            return {
                "message": str(e)
            }, 403


@api.route("/login")
class LoginUser(Resource):
    @api.expect(userlogin, validate=True)
    def post(self):
        try:
            req = api.payload
            usr = get_user_from_email(req["email"])
            assert check_password(req["password"], usr.password)

            login_user(usr)
            return usr.get_info(), 200
        except Exception as e:
            return {
                "message": "Could not log in " + str(e)
            }, 403

        
@api.route("/logout")
class LogoutUser(Resource):
    @login_required
    def delete(self):
        logout_user()
        return {
            "message": "Logout successful"
        }, 200