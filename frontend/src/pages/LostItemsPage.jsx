import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom'; // Link ko import karo

// ... (Locations aur Categories ki list waise hi rahegi)
const BIT_LOCATIONS = [ 'Library', 'Main Building', 'Lecture Halls (LH/SH)', 'Workshop', 'Cafeteria', 'Canteen', 'Hostel Area (NH/GH/PG)', 'Sports Complex', 'SAC', 'Parking', 'Auditorium', 'Admin Block', 'Bus Stop / Gate', 'Campus Roads', 'Health Center', 'Other' ];
const CATEGORIES = [ 'Electronics', 'Documents', 'Personal Items', 'Apparel', 'Accessories', 'ID Cards', 'Others' ];


const LostItemsPage = () => {
  // ... (saare states waise hi rahenge)
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // ... (useEffect ka logic waise hi rahega)
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const lostItems = response.data.filter(item => item.type === 'lost');
        setAllItems(lostItems);
      } catch (err) {
        setError('Could not fetch items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // ... (filtering logic waise hi rahega)
  const filteredItems = allItems.filter(item => {
    const matchesSearch = searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === '' || item.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lost Items
      </h1>

      {/* Filter Bar UI */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ... (Filter inputs waise hi rahenge) ... */}
        <input type="text" placeholder="Search by keyword..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md">
          <option value="">All Locations</option>
          {BIT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      {/* ===== YAHAN BADLAAV HAI ===== */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        // Yeh naya "Empty State" UI hai
        <div className="text-center py-16 px-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">No Items Found</h3>
          <p className="text-gray-500 mt-2">
            {searchTerm || selectedCategory || selectedLocation
              ? "No items match your current filters. Try adjusting your search."
              : "No lost items have been reported yet. Be the first one!"}
          </p>
          {!(searchTerm || selectedCategory || selectedLocation) && (
            <Link to="/report" className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
              Report a Lost Item
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default LostItemsPage;
