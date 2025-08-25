import React from 'react';
import { Link } from 'react-router-dom'; // <-- Isko import karo

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BIT Lost & Found</Link> {/* <-- Badlaav yahan */}
        </div>
        <nav className="hidden md:flex items-center space-x-4"> {/* Added items-center */}
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link> {/* <-- Badlaav yahan */}
          <Link to="/lost" className="text-gray-600 hover:text-blue-600">Lost Items</Link> {/* <-- Badlaav yahan */}
          <Link to="/found" className="text-gray-600 hover:text-blue-600">Found Items</Link> {/* <-- Badlaav yahan */}
          <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link> {/* <-- Naya link */}
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link> {/* <-- Naya link */}
          <Link 
            to="/report" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Report an Item
          </Link>
        </nav>
        {/* Mobile menu button (optional but good for responsiveness) */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
