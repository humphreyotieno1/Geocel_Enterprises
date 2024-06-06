from sqlalchemy.orm import relationship
from dbconfig import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    # Relationships
    user = relationship('User', backref='orders')
    services = relationship('Service', secondary='order_services', back_populates='orders')
    cart_items = relationship('CartItem', backref='order')

class OrderService(db.Model):
    __tablename__ = 'order_services'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)

    order = relationship('Order', backref='order_services')
    service = relationship('Service', backref='order_services')