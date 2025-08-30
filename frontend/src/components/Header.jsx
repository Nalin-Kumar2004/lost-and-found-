import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  // Menu ki state (khula hai ya band)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Jab bhi user naye page par jayega, menu apne aap band ho jayega
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold text-gray-800">
          <Link to="/">BIT Lost & Found</Link>
        </div>

        {/* --- DESKTOP MENU (Badi screen ke liye) --- */}
        {/* Yeh 'medium' screen (md) se upar dikhega */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>Home</NavLink>
          <NavLink to="/lost" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>Lost Items</NavLink>
          <NavLink to="/found" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>Found Items</NavLink>
          <NavLink to="/about" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`}>Contact</NavLink>
          <Link to="/report" className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700">
            Report Item
          </Link>
        </nav>

        {/* --- HAMBURGER BUTTON (Choti screen ke liye) --- */}
        {/* Yeh 'medium' screen (md) par chip jayega */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Cross Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (Simple Show/Hide) --- */}
      {/* Yeh div tabhi dikhega jab 'isMenuOpen' true hoga. Koi animation nahi, simple aur reliable. */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center space-y-1 p-4">
            <NavLink to="/" className="w-full text-center py-2 rounded-md hover:bg-gray-100">Home</NavLink>
            <NavLink to="/lost" className="w-full text-center py-2 rounded-md hover:bg-gray-100">Lost Items</NavLink>
            <NavLink to="/found" className="w-full text-center py-2 rounded-md hover:bg-gray-100">Found Items</NavLink>
            <NavLink to="/about" className="w-full text-center py-2 rounded-md hover:bg-gray-100">About</NavLink>
            <NavLink to="/contact" className="w-full text-center py-2 rounded-md hover:bg-gray-100">Contact</NavLink>
            <Link to="/report" className="w-full mt-2 text-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700">
              Report an Item
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
