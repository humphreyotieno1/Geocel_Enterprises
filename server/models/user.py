from sqlalchemy.orm import relationship
from .dbconfig import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    # Relationships
    orders = relationship('Order', backref='user')
    cart_items = relationship('CartItem', backref='user')

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}', email='{self.email}')"