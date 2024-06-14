
# from models import CartItem
# from models import Product
# from models import Image
# from models import Category
from dbconfig import app, api
from flask_restful import Resource


# class WelcomeResource(Resource):
#     def get(self):
#         return {'message': 'Geocel Enterprises Limited'}
# api.add_resource(WelcomeResource, '/')

# class ProductResource(Resource):
#     def get(self):
#         products = Product.query.all()
#         result = []
#         for product in products:
#             result.append({
#                 'id': product.id,
#                 'name': product.name,
#                 'description': product.description,
#                 'price': product.price,
#                 'stock': product.stock,
#                 'rating': product.rating,
#                 'imagelink': product.imagelink
#             })
#         return result

# api.add_resource(ProductResource, '/products')

if __name__ == '__main__':
    app.run()