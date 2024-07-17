import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        return prevItems.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== product.name));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const incrementQuantity = (productName) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decrementQuantity = (productName) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.name === productName && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
