from flask import request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
from flask_cors import CORS
import os
import logging
from itsdangerous import URLSafeTimedSerializer

from dbconfig import app, api, db
from models.user import User

load_dotenv()

CORS(app)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_DEFAULT_SENDER")
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")


mail = Mail(app)
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])


# Flask-RESTful routes
from routes.home import Home
from routes.admins import Admins, AdminById
from routes.users import Users, UserById
from routes.categories import Categories, CategoryById
from routes.cart_items import CartItems, CartItemById
from routes.services import Services, ServiceById
from routes.products import Products, ProductById
from routes.orders import Orders, OrderById
from routes.sign_up import SignUp
from routes.login import Login
from routes.mpesa import SimulateC2B, Callback

api.add_resource(Home, "/")
api.add_resource(Products, "/products")
api.add_resource(ProductById, "/products/<int:id>")
api.add_resource(Orders, "/orders")
api.add_resource(OrderById, "/orders/<int:id>")
api.add_resource(Services, "/services")
api.add_resource(ServiceById, "/services/<int:id>")
api.add_resource(Admins, "/admins")
api.add_resource(AdminById, "/admins/<int:id>")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Categories, "/categories")
api.add_resource(CategoryById, "/categories/<int:id>")
api.add_resource(CartItems, "/cartitems")
api.add_resource(CartItemById, "/cartitems/<int:id>")
api.add_resource(SignUp, "/signup")
api.add_resource(Login, "/login")
api.add_resource(SimulateC2B, "/simulatec2b")
api.add_resource(Callback, "/callback")


@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()

    # Extract data fields
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    company = data.get("company")
    email = data.get("email")
    phone_number = data.get("phoneNumber")
    message = data.get("message")
    agreed = data.get("agreed")

    msg = Message(
        "Contact Form Submission",
        sender= os.getenv('MAIL_DEFAULT_SENDER'),
        recipients=[os.getenv('MAIL_DEFAULT_SENDER')],
    )
    msg.body = f"""
    First Name: {first_name}
    Last Name: {last_name}
    Company: {company}
    Email: {email}
    Phone Number: {phone_number}
    Message: {message}
    Agreed: {agreed}
    """
    try:
        mail.send(msg)
        return jsonify({"message": "Form submitted successfully"}), 200
    except Exception as e:
        # logging.error(f"Error sending email: {e}")
        return jsonify({"message": "Failed to send email", "error": str(e)}), 500


@app.route("/service_form", methods=["POST"])
def service_form():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    service = data.get("service")
    message = data.get("message")

    msg = Message(
        "Service Form Submission",
        sender= os.getenv('MAIL_DEFAULT_SENDER'),
        recipients=[os.getenv('MAIL_DEFAULT_SENDER')],
    )
    
    msg.body = f"Name: {name}\nEmail: {email}\nService Requested: {service}\nMessage: {message}"
    
    try:
        mail.send(msg)
        return jsonify({"Message": "Form submitted successfully"}), 200
    except Exception as e:
        # logging.error(f"Error sending email: {e}")
        return jsonify({"Message": "Failed to send email", "error": str(e)}), 500
    

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    
    # Verify if email exists in the database
    user = User.query.filter_by(email=email).first()
    if user:
        token = s.dumps(email, salt='password-reset-salt')
        reset_url = f"http://localhost:5173/reset-password/{token}"  # Replace with your React app domain
        subject = "Password Reset Request"
        body = f"""Dear {user.user_name},\n\n
        We received a request to reset your password. Please click the link below to reset your password:\n
        {reset_url}\n\n
        If you did not request a password reset, please ignore this email.\n\n
        Regards,\n
        Geocel Enterprises\n
        """

        msg = Message(
            subject, sender="Geocel Enterprises <geocelenterprises2020@gmail.com>", recipients=[user.email]
        )
        msg.body = body
        mail.send(msg)
        
    return jsonify({"message": "If an account with that email exists, you will receive a password reset email."}), 200
    

@app.route('/reset-password/<token>', methods=['GET','POST'])
def reset_password(token):
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600) #Token valid for 1 hr
    except:
        return jsonify({"message": "The token is invalid or has expired"}), 400 
    
    if request.method == 'POST':
        data = request.get_json()
        new_password = data.get("new_password")
        
        #update user's password
        user = User.query.filter_by(email=email).first()
        if user:
            user.set_password(new_password)
            db.session.commit() 
            return jsonify({"message": "Your password has been reset successfully"}), 200
    return jsonify({"message": "Please provide a new password"}), 200


if __name__ == "__main__":
    app.run(debug=True)
