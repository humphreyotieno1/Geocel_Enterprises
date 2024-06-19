import React from 'react';
import { Link } from 'react-router-dom';
import { useColorMode } from '../hooks/useColorMode'; // Correct import path

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="bg-gray-800 text-white px-4">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        {/* Logo and Company Name (Clickable Home Link) */}
        <Link to="/" className="flex items-center text-xl font-bold">
          <img
            src="/vite.svg"
            alt="Geocel Logo"
            className="h-8 w-auto mr-2"
          />
          GEOCEL ENTERPRISES
        </Link>

        {/* Navbar Links */}
        <div className="flex justify-center flex-1">
          <Link to="/" className="mx-4">Home</Link>
          <Link to="/products" className="mx-4">Products</Link>
          <Link to="/services" className="mx-4">Services</Link>
          <Link to="/about" className="mx-4">About</Link>
          <Link to="/contact" className="mx-4">Contact</Link>
        </div>

        {/* Color Mode Toggle Button */}
        <button
          onClick={toggleColorMode}
          className="ml-4 focus:outline-none"
        >
          {colorMode === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}
