import os
from flask import request, jsonify
import requests
from requests.auth import HTTPBasicAuth
import base64
from datetime import datetime
from dotenv import load_dotenv

from dbconfig import app

load_dotenv()

consumer_key = os.getenv('CONSUMER_KEY')
consumer_secret = os.getenv('CONSUMER_SECRET')
shortcode = os.getenv('SHORTCODE')
passkey = os.getenv('PASSKEY')

encoded_credentials = base64.b64encode(f"{consumer_key}:{consumer_secret}".encode()).decode()
print(encoded_credentials)


def get_access_token():
    url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl'
    headers = {
        'Authorization': f'Basic {encoded_credentials}'  # Replace with your base64 encoded consumer key:secret
    }
    response = requests.request("GET", url, headers=headers)
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception("Failed to get access token: " + response.text)
    
@app.route('/simulate-c2b', methods=['POST'])
def simulate_c2b():
    data = request.json
    phone_number = data['phoneNumber']
    amount = data['amount']

    access_token = get_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    headers = {"Authorization": f"Bearer {access_token}"}

    request_payload = {
        "ShortCode": shortcode,
        "CommandID": "CustomerPayBillOnline",
        "Amount": amount,
        "Msisdn": phone_number,
        "BillRefNumber": "Test123"
    }

    response = requests.post(api_url, json=request_payload, headers=headers)
    return jsonify(response.json())


# @app.route('/mpesa-payment', methods=['POST'])
# def mpesa_payment():
#     data = request.json
#     phone_number = data['phoneNumber']
#     amount = data['amount']

#     access_token = get_access_token()
#     api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
#     headers = {"Authorization": f"Bearer {access_token}"}

#     timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
#     password = base64.b64encode((shortcode + passkey + timestamp).encode('ascii')).decode('ascii')

#     request_payload = {
#         "BusinessShortCode": shortcode,
#         "Password": password,
#         "Timestamp": timestamp,
#         "TransactionType": "CustomerPayBillOnline",
#         "Amount": amount,
#         "PartyA": phone_number,
#         "PartyB": shortcode,
#         "PhoneNumber": phone_number,
#         "CallBackURL": "https://yourdomain.com/callback",
#         "AccountReference": "Test123",
#         "TransactionDesc": "Payment for goods"
#     }

#     response = requests.post(api_url, json=request_payload, headers=headers)
#     return jsonify(response.json())

@app.route('/callback', methods=['POST'])
def callback():
    data = request.json
    # Process the payment confirmation here
    print(data)
    return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"})
    