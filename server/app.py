from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models.dbconfig import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = True

CORS(app, supports_credentials=True)
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class WelcomeResource(Resource):
    def get(self):
        return {'message': 'Geocel Enterprises Limited'}
api.add_resource(WelcomeResource, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)