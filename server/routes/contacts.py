from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_restful import Resource
from dotenv import load_dotenv
from flask_cors import CORS
import os

from dbconfig import app  

load_dotenv()

CORS(app)  

app.config["MAIL_SERVER"] = "localhost"
app.config["MAIL_PORT"] = 1025
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USERNAME"] = None
app.config["MAIL_PASSWORD"] = None

mail = Mail(app)
class Contact(Resource):
    
    def post(self):
        data = request.get_json()

        # Extract data fields
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        company = data.get('company')
        email = data.get('email')
        phone_number = data.get('phone_number')
        message = data.get('message')
        agreed = data.get('agreed')


        msg = Message(
            "Contact Form Submission",
            sender="geocelenterprises2020@gmail.com",
            recipients=['geocelenterprises2020@gmail.com']
        )
        msg.body = (f"""
        First Name: {first_name}
        Last Name: {last_name}
        Company: {company}
        Email: {email}
        Phone Number: {phone_number}
        Message: {message}
        Agreed: {agreed}
        """)
        mail.send(msg)

        return jsonify({'message': 'Form submitted successfully'}), 200
