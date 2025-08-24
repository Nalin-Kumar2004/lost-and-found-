import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <a href="/">BIT Lost & Found</a>
        </div>
        <nav className="space-x-4">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="/lost" className="text-gray-600 hover:text-blue-600">Lost Items</a>
          <a href="/found" className="text-gray-600 hover:text-blue-600">Found Items</a>
          <a 
            href="/report" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Report an Item
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;