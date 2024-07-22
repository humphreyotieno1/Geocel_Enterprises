import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { IoMdContact } from 'react-icons/io';

export default function NavBar({ setSearchQuery, loggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className="bg-gray-800 text-white px-4">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center md:text-xl lg:text-2xl font-bold">
          <img
            src="https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721224367/GeocelDB/assets/logo.png"
            alt="Geocel Logo"
            className="h-8 w-auto mr-2"
          />
          GEOCEL ENTERPRISES
        </Link>

        <div className="hidden lg:flex justify-center flex-1">
          <Link to="/" className="mx-4 hover:text-gray-400">Home</Link>
          <Link to="/products" className="mx-4 hover:text-gray-400">Products</Link>
          <Link to="/services" className="mx-4 hover:text-gray-400">Services</Link>
          <Link to="/about" className="mx-4 hover:text-gray-400">About</Link>
          <Link to="/contact" className="mx-4 hover:text-gray-400">Contact</Link>
        </div>

        {loggedIn && (
          <form onSubmit={handleSearchSubmit} className="max-lg:hidden lg:flex items-center">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-2 py-1 text-black rounded"
            />
            <button type="submit" className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">
              Search
            </button>
          </form>
        )}

        <div className="max-lg:hidden lg:flex items-center ml-8">
          {loggedIn ? (
            <Button
              onClick={onLogout}
              colorScheme="blue"
              leftIcon={<IoMdContact />}
              className="flex items-center space-x-1 rounded hover:bg-gray-600"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                colorScheme="blue"
                leftIcon={<IoMdContact />}
                className="flex items-center space-x-1 rounded hover:bg-gray-600"
              >
                <span>Log In / Sign Up</span>
              </Button>
            </Link>
          )}
        </div>

        <button className="lg:hidden flex items-center" onClick={toggleDropdown}>
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gray-800">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-gray-700">Products</Link>
          <Link to="/services" className="block px-4 py-2 hover:bg-gray-700">Services</Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">About</Link>
          <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">Contact</Link>
          {loggedIn && (
            <form onSubmit={handleSearchSubmit} className="px-4 py-2">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="px-2 py-1 text-black rounded w-full"
              />
              <button type="submit" className="mt-2 w-full px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">
                Search
              </button>
            </form>
          )}
          <div className="px-4 py-2">
            {loggedIn ? (
              <Button onClick={onLogout} colorScheme="blue" className="w-full">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button colorScheme="blue" className="w-full">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
