from flask import make_response, request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from dbconfig import db
from models.user import User
import logging

class SignUp(Resource):
    def post(self):
        logging.info("Signup request received")

        try:
            data = request.get_json()
            logging.info(f"Received data: {data}")
            user_name = data.get("user_name")
            email = data.get("email")
            password = data.get("password")
            if not user_name or not email or not password:
                logging.error("Missing user details")
                return make_response({"error": "User details not provided"}, 400)
        except Exception as e:
            logging.error(f"Exception: {e}")
            return make_response({"error": str(e)}, 400)

        logging.info("Checking for existing username")
        existing_user = User.query.filter_by(user_name=user_name).first()
        if existing_user:
            logging.warning("Username already taken")
            return make_response({"error": "Username already taken"}, 400)

        logging.info("Checking for existing email")
        existing_email = User.query.filter_by(email=email).first()
        if existing_email:
            logging.warning("Email already taken")
            return make_response({"error": "Email already taken"}, 400)

        if user_name and email and password:
            try:
                new_user = User(user_name=user_name, email=email)
                new_user.set_password(password) # Ensure this is properly hashed

                logging.info("Adding new user to the database")
                db.session.add(new_user)
                db.session.commit()

                access_token = create_access_token(identity=new_user.id)

                logging.info("User registration successful")
                return make_response({"message": "User registration success", "access_token": access_token}, 201)
            except ValueError as e:
                logging.error(f"ValueError: {e}")
                return make_response({"error": str(e)}, 400)
            except Exception as e:
                logging.error(f"Exception: {e}")
                return make_response({"error": str(e)}, 400)

        logging.error("422 Unprocessable Entity")
        return make_response({"error": "422 Unprocessable Entity"}, 422)


