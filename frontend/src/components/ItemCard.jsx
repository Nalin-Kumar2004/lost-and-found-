import React from 'react';

// Dekho, humein props mein se 'item' object mil raha hai
const ItemCard = ({ item }) => {
  // Ab hum fakeItem ke bajaaye 'item' prop ka use karenge
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-48 object-cover"
        // Agar imageUrl nahi hai, toh ek placeholder dikhao
        src={item.imageUrl || 'https://via.placeholder.com/400x300.png/007bff/ffffff?text=No+Image'}
        alt={item.title}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Location:</span> {item.location}
        </p>
        <p className="text-sm text-gray-500">
          {/* Hum date ko readable format mein badal rahe hain */}
          <span className="font-medium">Date:</span> {new Date(item.date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
