from sqlalchemy.orm import relationship
from dbconfig import db
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    product = relationship('Product', back_populates='images')

    def __repr__(self):
        return f"Image(id={self.id}, product_id={self.product_id}, file_path='{self.file_path}', caption='{self.caption}')"