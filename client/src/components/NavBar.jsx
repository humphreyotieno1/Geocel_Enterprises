import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IoMdContact } from "react-icons/io";
import { FaSearch } from 'react-icons/fa'

export default function NavBar({ setSearchQuery, loggedIn, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery); // Pass the search query immediately
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsFocused(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white px-4">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto overflow-hidden">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img
            src="https://res.cloudinary.com/drdradtyj/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1721224367/GeocelDB/assets/logo.png"
            alt="Geocel Logo"
            className="h-8 w-auto mr-2"
          />
          GEOCEL ENTERPRISES
        </Link>

        <div className="hidden md:flex justify-center flex-1">
          <Link to="/" className="mx-4 hover:text-gray-400">
            Home
          </Link>
          <Link to="/products" className="mx-4 hover:text-gray-400">
            Products
          </Link>
          <Link to="/services" className="mx-4 hover:text-gray-400">
            Services
          </Link>
          <Link to="/about" className="mx-4 hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="mx-4 hover:text-gray-400">
            Contact
          </Link>
          {/* Search Form always visible */}
          <form
            onSubmit={handleSearchSubmit}
            className="ml-4 flex items-center relative"
          >
            <FaSearch className="text-gray-500 absolute left-2" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search..."
              className={`pl-8 pr-2 py-1 text-black rounded transition-width duration-300 ease-in-out ${
                isFocused ? "w-64" : "w-0 opacity-0"
              }`}
            />
          </form>
        </div>

        <div className="hidden md:flex items-center ml-4 md:ml-8">
          {loggedIn ? (
            <Button
              onClick={onLogout}
              colorScheme="blue"
              leftIcon={<IoMdContact />}
              className="flex items-center space-x-1 rounded hover:bg-gray-600"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/login">
              <Button
                colorScheme="blue"
                leftIcon={<IoMdContact />}
                className="flex items-center space-x-1 rounded hover:bg-gray-600"
              >
                <span>Sign In</span>
              </Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden flex items-center"
          onClick={toggleDropdown}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">
            Home
          </Link>
          <Link to="/products" className="block px-4 py-2 hover:bg-gray-700">
            Products
          </Link>
          <Link to="/services" className="block px-4 py-2 hover:bg-gray-700">
            Services
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">
            About
          </Link>
          <Link to="/contact" className="block px-4 py-2 hover:bg-gray-700">
            Contact
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="ml-4 flex items-center relative"
          >
            <FaSearch className="text-gray-500 absolute left-2" />
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search..."
              className={`pl-8 pr-2 py-1 text-black rounded transition-width duration-300 ease-in-out ${
                isFocused ? "w-64" : "w-0 opacity-0"
              }`}
            />
          </form>
          <div className="px-4 py-2">
            {loggedIn ? (
              <Button onClick={onLogout} colorScheme="blue" className="w-1/3 sm:w-1/3 mx-auto">
                Sign Out
              </Button>
            ) : (
              <Link to="/login">
                <Button colorScheme="blue" className="w-1/3 sm:w-1/3 mx-auto">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
