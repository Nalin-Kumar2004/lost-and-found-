import React from 'react';
import { Link } from 'react-router-dom'; // Link ko import karo

const ItemCard = ({ item }) => {
  return (
    // Poore div ko Link component se wrap kar do
    <Link to={`/items/${item._id}`} className="block">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out h-full p-4 flex flex-col">
        <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden rounded-xl mb-2">
          <img
            className="w-full h-full object-cover"
            src={item.imageUrl || 'https://via.placeholder.com/400x300.png/007bff/ffffff?text=No+Image'}
            alt={item.title}
          />
        </div>
        <hr className="my-2 border-gray-200" />
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">
            {item.title}
          </h3>
          <p className="text-base text-gray-600 mb-1">
            <span className="font-semibold">Location:</span> {item.location}
          </p>
          <p className="text-base text-gray-500">
            <span className="font-semibold">Date:</span> {new Date(item.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;