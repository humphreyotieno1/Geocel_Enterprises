from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

#local imports
from dbconfig import db
from models.admin import Admin
from models.user import User
from models.category import Category
from models.cart_item import CartItem

from routes.services import Services, ServiceById

from routes.products import Products, ProductById
from routes.orders import Orders, OrderById

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False




migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)
bcrypt = Bcrypt(app)

CORS(app)


api.add_resource(Products, '/products')
api.add_resource(ProductById, '/products/<int:id>')
api.add_resource(Orders, '/orders')
api.add_resource(OrderById, '/orders/<int:id>')
api.add_resource(Services, '/sevices')
api.add_resource(ServiceById, '/services/<int:id>')






if __name__ == "__main__":
    app.run(debug=True)