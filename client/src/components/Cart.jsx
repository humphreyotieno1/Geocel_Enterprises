import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ showModal, toggle }) => {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggle}
        >
          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-xs sm:max-w-md md:max-w-lg w-full mx-4 relative overflow-y-auto overflow-x-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={toggle}
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded" />
                    <div className="flex-1 ml-2 sm:ml-4">
                      <h3 className="text-sm sm:text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Price: {item.price} kshs</p>
                      <p className="text-gray-600 text-sm">Total: {(item.price * item.quantity).toFixed(2)} kshs</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          onClick={() => decrementQuantity(item.name)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                          onClick={() => incrementQuantity(item.name)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 bg-red-500 text-white text-xs sm:text-sm rounded hover:bg-red-600"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="text-lg font-semibold">Total:</p>
                    <p className="text-gray-700">kshs {calculateTotal()}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="px-3 py-2 bg-green-500 text-white text-sm sm:text-base rounded hover:bg-green-600 mb-2"
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
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
