from flask import request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
from flask_cors import CORS
import os

from dbconfig import app, api

load_dotenv()

CORS(app)

app.config["MAIL_SERVER"] = "localhost"
app.config["MAIL_PORT"] = 1025
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USERNAME"] = None
app.config["MAIL_PASSWORD"] = None

mail = Mail(app)


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
        sender="geocelenterprises2020@gmail.com",
        recipients=["geocelenterprises2020@gmail.com"],
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
        sender="geocelenterprises2020@gmail.com",
        recipients=["geocelenterprises2020@gmail.com"],
    )
    
    msg.body = f"Name: {name}\nEmail: {email}\nService Requested: {service}\nMessage: {message}"
    
    try:
        mail.send(msg)
        return jsonify({"Message": "Form submitted successfully"}), 200
    except Exception as e:
        return jsonify({"Message": "Failed to send email", "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
