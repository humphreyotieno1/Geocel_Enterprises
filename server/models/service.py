from sqlalchemy_serializer import SerializerMixin
from dbconfig import db


class Service(db.Model, SerializerMixin):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
<<<<<<< HEAD
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
=======
    duration = db.Column(db.Integer, nullable=False)  # Duration in minutes
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
   
>>>>>>> b327d6df4718a18179239c3d10a5afbf5207fb7d

    # Relationships
    user = db.relationship("User", back_populates="services")
    orders = db.relationship("Order", back_populates="services")
    cart_items= db.relationship("CartItem", back_populates="services")

    def __repr__(self):
        return f"Service(id={self.id}, name='{self.name}', price={self.price}, duration={self.duration})"