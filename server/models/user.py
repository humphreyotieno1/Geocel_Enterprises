from sqlalchemy_serializer import SerializerMixin
from dbconfig import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=db.func.now())

    # Relationships
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', back_populates='user', cascade='all, delete-orphan')
    services = db.relationship('Service', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}', email='{self.email}')"