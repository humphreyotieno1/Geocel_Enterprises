from dbconfig import db
from app import app

from models.product import Product
from models.category import Category
from models.admin import Admin
from models.service import Service
from models.cart_item import CartItem
from models.user import User
from models.order import Order

with app.app_context():
    Product.query.delete()
    Category.query.delete()
    Admin.query.delete()
    User.query.delete()
    Service.query.delete()
    CartItem.query.delete()
    Order.query.delete()
    

    product1 = Product(
        name="mabati",
        description="mabati inayo dumu",
        image_url="https://",
        price="4000",
        is_in_stock=True,
        rating="4.5",
        category_id= 1
    )
    
    service1 = Service(
        name="Home Cleaning",
        description="Thorough cleaning of your home",
        price=50.00,
        duration=120,  # Duration in minutes
        user_id=1
    )
    
    order1 = Order(
        total_amount=400.00,
        status='pending',
        user_id=1,
        product_id=1,  
        service_id=1  
    )
    
    cart_item1 = CartItem(
        quantity=2,
        user_id=1,
        product_id=1,  
        service_id=1   
    )
    
    category1 = Category(name="Dumuzas", description="ukinunua leo ni hadi milele")
    admin = Admin(user_name="Fello", email="fello@gmail.com")
    user1 = User(user_name="Eiva", email="eiva@gmail.com")
    

    db.session.add_all([product1, category1, admin, user1, order1, service1, cart_item1])
    
    db.session.commit()


from app import db, Product

db.create_all()

products = [
    Product(
        name='Bamburi Fundi Cement',
        imageUrl='https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
        imageAlt='Bamburi Fundi Cement',
        category='Construction',
        quantity=10,
        price=760.0,
        description='Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
        formattedPrice='kshs 760.00',
        rating=4,
        numReviews=10
    ),
    # Add more products here
]

db.session.bulk_save_objects(products)
db.session.commit()
print("Database seeded!")
