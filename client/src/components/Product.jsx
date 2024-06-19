import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from './Cart.jsx';

// Sample product data
const initialProducts = [
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
    imageAlt: 'Bamburi Fundi Cement',
    quantity: 10,
    price: 760.0,
    description:
      'Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
    name: 'Bamburi Fundi Cement',
    formattedPrice: 'kshs 760.00',
    rating: 4,
    numReviews: 10,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629096/GEOCEL/Steel_Nail_3%22.jpg',
    imageAlt: 'Nails 3 inches',
    quantity: 50,
    price: 250.0,
    description: 'High-quality 3-inch nails for various construction needs.',
    name: 'Per Kg Nails 3 inches',
    formattedPrice: 'kshs 250.00',
    rating: 4.5,
    numReviews: 30,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718627953/GEOCEL/Juakali_wheelbarrow.jpg',
    imageAlt: 'Wheelbarrow',
    quantity: 5,
    price: 2500.0,
    description: 'Sturdy wheelbarrow for transporting materials around the construction site.',
    name: 'Wheelbarrow',
    formattedPrice: 'kshs 2500.00',
    rating: 4.8,
    numReviews: 15,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629200/GEOCEL/Shovel.jpg',
    imageAlt: 'Shovel',
    quantity: 20,
    price: 1200.0,
    description: 'Durable shovel for digging and moving bulk materials.',
    name: 'Shovel',
    formattedPrice: 'kshs 1200.00',
    rating: 4.6,
    numReviews: 25,
  },
  {
    imageUrl: 'https://res.cloudinary.com/drdradtyj/image/upload/v1718629253/GEOCEL/Hammer.jpg',
    imageAlt: 'Hammer',
    quantity: 15,
    price: 800.0,
    description: 'Heavy-duty hammer for all your construction needs.',
    name: 'Hammer',
    formattedPrice: 'kshs 800.00',
    rating: 4.7,
    numReviews: 22,
  },
];

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState(initialProducts); // Use initialProducts here
  const { cartItems, addToCart } = useContext(CartContext);

  const toggle = () => {
    setShowModal(!showModal);
  };

  // Use useEffect to fetch products from an API
  useEffect(() => {
    // If fetching from an API, you would use the fetch method here
    // async function getProducts() {
    //   try {
    //     const response = await fetch('https://your-api-endpoint/products');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch products');
    //     }
    //     const data = await response.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     console.error('Error fetching products:', error.message);
    //   }
    // }
    // getProducts();

    // For demonstration, using initialProducts directly
    // setProducts(initialProducts);
  }, []);

  return (
    <div className="flex flex-col justify-center bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center px-20 py-5">
        <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10">Shop</h1>
        {!showModal && (
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
            onClick={toggle}
          >
            Cart ({cartItems.length})
          </button>
        )}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 sm:p-10">
            <img src={product.imageUrl} alt={product.imageAlt} className="rounded-md h-48 object-cover w-full" />
            <div className="mt-4">
              <h1 className="text-lg uppercase font-bold">{product.name}</h1>
              <p className="mt-2 text-gray-600 text-sm">{product.description.slice(0, 40)}...</p>
              <p className="mt-2 text-gray-600">{product.formattedPrice}</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700"
                onClick={() => {
                  addToCart(product);
                }}
              >
                Add to cart
              </button>
              <div className="flex items-center">
                <span className="text-gray-700 mr-1">{product.rating}</span>
                <svg
                  className="w-4 h-4 fill-current text-yellow-500"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1.67l2.72 5.51h6.56l-4.76 4.63 1.13 6.57-5.63-3-5.63 3 1.13-6.57-4.76-4.63h6.56l2.72-5.51z"
                  />
                </svg>
                <span className="text-gray-700 ml-1">({product.numReviews})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Cart showModal={showModal} toggle={toggle} />
    </div>
  );
}
