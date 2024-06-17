from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

#local imports
from dbconfig import db
from models.user import User
from models.product import Product
from models.category import Category
from models.cart_item import CartItem
from models.order import Order
from models.service import Service


app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False




migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)
bcrypt = Bcrypt(app)

CORS(app)








if __name__ == "__main__":
    app.run(debug=True)