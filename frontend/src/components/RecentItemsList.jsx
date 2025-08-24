import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';

// Yeh component 'type' (lost/found) aur 'title' as a prop lega
const RecentItemsList = ({ type, title }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const filteredItems = response.data
          .filter(item => item.type === type) // Type ke hisaab se filter karo
          .slice(0, 3); // Sirf shuru ke 3 items lo (sabse naye)
        setItems(filteredItems);
      } catch (err) {
        console.error(`Error fetching ${type} items:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentItems();
  }, [type]); // Dependency array mein 'type' daalo

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link to={`/${type}`} className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No recent {type} items found.</p>
      )}
    </div>
  );
};

export default RecentItemsList;
