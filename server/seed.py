import pandas as pd
from werkzeug.security import generate_password_hash

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

    

    def seed_products_from_excel(file_path):
        # Load the excel file
        xls = pd.ExcelFile(file_path)
        
        # Loop through each sheet in the excel file
        for sheet_name in xls.sheet_names:
            df = pd.read_excel(xls, sheet_name)
            
            # Print out column names for debugging
            print(f"Sheet: {sheet_name}")
            print("Columns:", df.columns.tolist())
            
            # Loop through each row in the dataframe
            for index, row in df.iterrows():
                try:
                    product_data = {    
                        "name": row['name'],
                        "description": row['description'],
                        "imageUrl": row['imageUrl'],
                        "imageAlt": row['imageAlt'],
                        "price": row['price'],
                        "is_in_stock": row['is_in_stock'],
                        "rating": row['rating'],
                        "category_id": row['category_id'],
                        "admin_id": row['admin_id'],
                    }
                    print("Seeding product:", product_data)
                    product = Product(**product_data)
                    db.session.add(product)
                except Exception as e:
                    print(f"Error seeding product in sheet '{sheet_name}', row {index + 1}: {e}")
                    raise  # Reraise the exception to halt execution and see the full traceback

    print("seeding services...")
    def seed_services():
        services = [
            {
                "name": "Plaining",
                "description": "Plaining",
                "price": "10.00",
                "availability": True,  
                "user_id": 1,
            },
            {
                "name": "Transport",
                "description": "Delivering your products safely",
                "price": "500.00",
                "availability": True,  
                "user_id": 1,
            },
            {
                "name": "Machine Work",
                "description": "you can trust us with your machines",
                "price": "50.00",
                "availability": True,  
                "user_id": 1,
            },
            {
                "name": "Welding charges",
                "description": "Welding charges",
                "price": "3000.00",
                "availability": True,  
                "user_id": 1,
            },
            {
                "name": "Vibrator for hire",
                "description": "Vibrator for hire",
                "price": "0.00",
                "availability": False,  
                "user_id": 1,
            },
            {
                "name": "Trappers for hire",
                "description": "Trappers for hire",
                "price": "140.00",
                "availability": True,  
                "user_id": 1,
            },
            {
                "name": "Labor charge",
                "description": "Labor charge",
                "price": "0.00",
                "availability": False,  
                "user_id": 1,
            },
        ]

        for service_data in services:
            service = Service(**service_data)
            db.session.add(service)

    print("seeding orders...")

    def seed_orders():
        orders = [
            {
                "total_amount": 400.00,
                "status": "pending",
                "user_id": 1,
                "product_id": 1,
                "service_id": 1,
            },
        ]

        for order_data in orders:
            order = Order(**order_data)
            db.session.add(order)

    print("seeding cart_items...")

    def seed_cart_items():
        cart_items = [
            {"quantity": 2, "user_id": 1, "product_id": 1, "service_id": 1},
        ]

        for cart_item_data in cart_items:
            cart_item = CartItem(**cart_item_data)
            db.session.add(cart_item)

    print("seeding categories...")

    def seed_categories():
        categories = [
            {"name": "Tools", "description": "ukinunua tool leo ni hadi milele"},
            {"name": "Construction", "description": "jenga nchi"},
            {"name": "Timber", "description": "miti shamba"},
            {"name": "Plumbing", "description": "njia za maji"},
            {"name": "welding", "description": "chomelea"},
            {"name": "Fencing", "description": "seng'enge ni ng'ombe"},
            {"name": "Paint", "description": "Peter marangi"},
            {"name": "Fittings", "description": "ziba mashimo"},
            {"name": "Nails", "description": "hit us on the head"},
            {"name": "Mabati", "description": "nunua mabati ya kudumu"},
        ]

        for category_data in categories:
            category = Category(**category_data)
            db.session.add(category)

    def seed_users():
        pass

    print("seeding users...")
    user1 = User(user_name="Testuser", email="testuser@gmail.com")
    user1.set_password("E#12345678e")
    db.session.add(user1)

    print("seeding admins...")

    def seed_admin():
        admins = [{"user_name": "Humphrey", "email": "humphrey@gmail.com"}]

        for admin_data in admins:
            admin = Admin(**admin_data)
            db.session.add(admin)

    try:
        seed_products_from_excel('./GeocelProductsDBFinal.xlsx')
        seed_categories()
        seed_cart_items()
        seed_orders()
        seed_services()
        seed_admin()
        seed_users()

        db.session.commit()
        print("database seeded successfully!")

    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {e}")
