import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import Cart from './Cart.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../components/Pagination.jsx';
import CategorySelector from '../components/CategorySelector.jsx';

const Products = ({ searchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { cartItems, addToCart } = useContext(CartContext);

  const itemsPerPage = 12;

  const toggleCart = () => {
    setShowModal(!showModal);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category_id === parseInt(selectedCategory));

  const searchedProducts = searchQuery
    ? filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredProducts;

  const totalPages = Array.isArray(searchedProducts) ? Math.ceil(searchedProducts.length / itemsPerPage) : 0;
  const paginatedProducts = Array.isArray(searchedProducts) ? searchedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://geocel-enterprises.onrender.com/products'),
          fetch('https://geocel-enterprises.onrender.com/categories')
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching products and categories:', error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const formatPrice = (price) => `kshs ${price.toFixed(2)}`;

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="md:w-1/4 p-4 sm:px-6 lg:px-8 xl:px-10 mt-10 md:mt-0">
        <CategorySelector
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
        />
      </div>

      <div className="md:w-3/4 p-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl uppercase font-bold mt-10 mb-8">Shop</h1>
          <button
            className="px-2 py-1 md:px-4 md:py-2 bg-gray-800 text-white text-xs md:text-sm font-bold uppercase rounded hover:bg-gray-700"
            onClick={toggleCart}
          >
            Cart ({cartItems.length})
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden p-4 sm:p-6 relative group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-48">
                <img
                  className="w-full h-full object-cover"
                  src={product.imageUrl}
                  alt={product.imageAlt}
                />
                {product.is_on_sale && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    SALE
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h1 className="font-bold text-sm sm:text-base">{product.name}</h1>
                <p className="text-gray-700 text-xs sm:text-sm">{formatPrice(product.price)}</p>
                <p className="text-gray-700 text-xs sm:text-sm">{product.is_in_stock ? 'In Stock' : 'Out of Stock'}</p>
                <p className="text-gray-700 text-xs sm:text-sm">{product.rating}</p>
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => openQuickView(product)}
                    className="mb-2 sm:mb-0 px-2 py-1 sm:px-3 sm:py-2 bg-gray-300 text-gray-700 text-xs sm:text-sm font-semibold rounded hover:bg-gray-400"
                  >
                    Quick View
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-800 text-white text-xs sm:text-sm font-semibold rounded hover:bg-gray-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Cart Modal */}
      <Cart showModal={showModal} toggle={toggleCart} />

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
          >
            <motion.div
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto overflow-x-hidden"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick View</h2>
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.imageAlt}
                className="rounded-md h-48 object-cover w-full mb-4"
              />
              <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
              <p className="text-gray-700">{formatPrice(selectedProduct.price)}</p>
              <p className="mt-2 text-sm sm:text-base">{selectedProduct.description}</p>
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeQuickView();
                  }}
                  className="mb-2 sm:mb-0 px-3 py-2 bg-gray-800 text-white text-sm font-semibold rounded hover:bg-gray-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={closeQuickView}
                  className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
