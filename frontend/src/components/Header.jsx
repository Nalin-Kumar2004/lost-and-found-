import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  // Step 1: Menu ki "yaaddasht" (state) banana
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">BIT Lost & Found</Link>
        </div>

        {/* Hamburger Button (Sirf mobile par dikhega) */}
        {/* `md:hidden` ka matlab hai 'medium' screen size se upar isko chipa do */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              // Cross Icon (Jab menu khula ho)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon (Jab menu band ho)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu (Sirf badi screen par dikhega) */}
        {/* `hidden` matlab by default chipa hua, `md:flex` matlab 'medium' screen se upar isko dikhao */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Home</NavLink>
          <NavLink to="/lost" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Lost Items</NavLink>
          <NavLink to="/found" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Found Items</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Contact</NavLink>
          <Link 
            to="/report" 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Report an Item
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Dropdown (Yeh tabhi dikhega jab isMenuOpen true hoga) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center space-y-2 py-4">
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Home</NavLink>
            <NavLink to="/lost" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Lost Items</NavLink>
            <NavLink to="/found" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Found Items</NavLink>
            <NavLink to="/about" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>About</NavLink>
            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"}>Contact</NavLink>
            <Link 
              to="/report" 
              onClick={() => setIsMenuOpen(false)}
              className="w-11/12 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Report an Item
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
