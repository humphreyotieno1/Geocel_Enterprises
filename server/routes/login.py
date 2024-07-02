from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import create_access_token

from models.user import User
from models.admin import Admin


class Login(Resource):
    def post(self):
        try:
            user_name = request.get_json()["user_name"]
            password = request.get_json()["password"]
        except KeyError:
            return make_response({"error": "Username or password not provided"}, 400)
        
        user = User.query.filter(User.user_name == user_name).first()
        if user and user.authenticate(password):
            access_token = create_access_token(identity=user.id)
            return make_response({"message": "User Login Success", "access_token": access_token}, 200) 
        
        else:
            return make_response({"error": "invalid username or password"}, 401)
        
        
    def post(self):
        try:
            user_name = request.get_json()["user_name"]
            password = request.get_json()["password"]
            
        except KeyError:
            return make_response({"error": "Username or password not provided"}, 400)
        
        admin = Admin.query.filter(Admin.user_name == user_name).first()
        if admin and admin.authenticate(password):
            access_token = create_access_token(identity=admin.id)
            return make_response({"message": "Admin Login Success", "access_token": access_token}, 200)
        
        else:
            return make_response({"error":"invalid username or password"}, 401)
        
                   