import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

// Locations aur Categories ki list taaki hum dropdowns bana sakein
const BIT_LOCATIONS = [
  'Library', 'Main Building', 'Lecture Halls (LH/SH)', 'Workshop', 'Cafeteria',
  'Canteen', 'Hostel Area (NH/GH/PG)', 'Sports Complex', 'SAC', 'Parking',
  'Auditorium', 'Admin Block', 'Bus Stop / Gate', 'Campus Roads', 'Health Center', 'Other'
];
const CATEGORIES = [
  'Electronics', 'Documents', 'Personal Items', 'Apparel', 'Accessories', 'ID Cards', 'Others'
];

const LostItemsPage = () => {
  // Original data ke liye states
  const [allItems, setAllItems] = useState([]); // API se aaya saara data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters ke liye naye states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        const lostItems = response.data.filter(item => item.type === 'lost');
        setAllItems(lostItems); // Saare lost items ko state mein save karo
      } catch (err) {
        setError('Could not fetch items. Please try again later.');
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Filtering logic
  const filteredItems = allItems.filter(item => {
    // 1. Search term ke hisaab se filter (title ya description mein)
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Category ke hisaab se filter
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;

    // 3. Location ke hisaab se filter
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

      {/* ===== FILTER BAR UI ===== */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <input 
          type="text"
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {/* Category Dropdown */}
        <select 
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {/* Location Dropdown */}
        <select 
          value={selectedLocation}
          onChange={e => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Locations</option>
          {BIT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </div>

      {/* ===== ITEMS GRID ===== */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No items found matching your criteria.</p>
      )}
    </div>
  );
};

export default LostItemsPage;
