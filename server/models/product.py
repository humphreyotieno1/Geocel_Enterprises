
from dbconfig import db
from sqlalchemy_serializer import SerializerMixin

# from enum import Enum as PyEnum
# from sqlalchemy import Enum


# class View(PyEnum):
#     IMAGE = 'image'
#     VIDEO = 'video'

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image_url = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=db.func.now())
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    
    # Relationships
    category = db.relationship('Category', back_populates='category')
    cart_items = db.relationship('CartItem', back_populates='product', cascade='all, delet-orphan')
    orders = db.relationship('Order', back_populates='product', cascade='all, delet-orphan')
    
    def __repr__(self):
        return f"Product(id={self.id}, name='{self.name}', price={self.price}, rating={self.rating})"