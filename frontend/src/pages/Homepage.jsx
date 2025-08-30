import React from 'react';
import { Link } from 'react-router-dom';
import RecentItemsList from '../components/RecentItemsList';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24 bg-white rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Lost Something? <span className="text-blue-600">Or Found It?</span>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          The central place for all lost and found items within the BIT Mesra campus. Report items in seconds.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {/* --- YAHAN BADLAAV KIYA HAI --- */}
          <Link 
            to="/report?type=lost" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-transform duration-200 transform hover:scale-105"
          >
            Report a Lost Item
          </Link>
          <Link 
            to="/report?type=found" 
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-transform duration-200 transform hover:scale-105"
          >
            Report a Found Item
          </Link>
          {/* ------------------------------------ */}
        </div>
      </div>

      {/* Recent Listings Section */}
      <div className="space-y-12">
        <RecentItemsList type="lost" />
        <RecentItemsList type="found" />
      </div>
    </div>
  );
};

export default HomePage;
