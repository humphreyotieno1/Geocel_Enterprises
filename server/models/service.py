from sqlalchemy_serializer import SerializerMixin
from dbconfig import db


class Service(db.Model, SerializerMixin):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # Duration in minutes
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, onupdate=db.func.now())
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships
    user = db.relationship("User", back_populates="services")
    orders = db.relationship("Order", back_populates="services")

    def __repr__(self):
        return f"Service(id={self.id}, name='{self.name}', price={self.price}, duration={self.duration})"