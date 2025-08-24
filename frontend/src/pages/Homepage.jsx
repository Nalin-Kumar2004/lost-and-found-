import React from 'react';
import { Link } from 'react-router-dom';
import RecentItemsList from '../components/RecentItemsList';

const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* Section 1: Hero Section */}
      <div className="text-center bg-white p-12 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Lost Something? Or Found It?
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to the official Lost & Found portal for BIT Mesra. Report items you've lost or found to help our community.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/report?type=lost"
            className="bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            Report a Lost Item
          </Link>
          <Link
            to="/report?type=found"
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
          >
            Report a Found Item
          </Link>
        </div>
      </div>

      {/* Section 2: Recent Listings */}
      <div>
        {/* Recent Lost Items List */}
        <RecentItemsList type="lost" title="Recently Lost Items" />

        {/* Recent Found Items List */}
        <RecentItemsList type="found" title="Recently Found Items" />
      </div>
    </div>
  );
};

export default HomePage;
