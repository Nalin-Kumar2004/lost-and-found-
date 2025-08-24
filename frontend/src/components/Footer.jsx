import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} BIT Mesra Lost & Found. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">
          Made with ❤️ by a BITian
        </p>
      </div>
    </footer>
  );
};

export default Footer;
