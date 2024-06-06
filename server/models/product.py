from sqlalchemy.orm import relationship
from dbconfig import db
from datetime import datetime
from enum import Enum as PyEnum
from sqlalchemy import Enum


class View(PyEnum):
    IMAGE = 'image'
    VIDEO = 'video'
    
    
class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    view = db.Column(Enum(View), nullable=False, default=View.IMAGE)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    
    
    # relationships
    images = relationship('Image', back_populates='product')
    category = relationship('Category', backref='products')
    brand = relationship('Brand', backref='products')
    cart_items = relationship('CartItem', backref='product')

    def __repr__(self):
        return f"Product(id={self.id}, name='{self.name}', price={self.price}, view_type='{self.view_type.value}', rating={self.rating})"
