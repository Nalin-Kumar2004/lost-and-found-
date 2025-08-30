import React from 'react';
import { Link } from 'react-router-dom'; // Link ko import karo

const ItemCard = ({ item }) => {
  return (
    // Poore div ko Link component se wrap kar do
    <Link to={`/items/${item._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out h-full">
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={item.imageUrl || 'https://via.placeholder.com/400x300.png/007bff/ffffff?text=No+Image'}
            alt={item.title}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Location:</span> {item.location}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;