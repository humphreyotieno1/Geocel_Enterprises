import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ showModal, toggle }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggle}
        >
          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg w-full mx-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 sm:w-16 sm:h-16 rounded" />
                    <div className="flex-1 ml-2 sm:ml-4">
                      <h3 className="text-sm sm:text-lg font-bold">{item.title}</h3>
                      <p className="text-gray-600 text-sm">${item.price}</p>
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-4 flex flex-col sm:flex-row">
                  <button
                    className="px-3 py-2 bg-green-500 text-white text-sm sm:text-base rounded hover:bg-green-600 mb-2 sm:mb-0 sm:mr-2"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                  <button
                    className="px-3 py-2 bg-gray-500 text-white text-sm sm:text-base rounded hover:bg-gray-600"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
