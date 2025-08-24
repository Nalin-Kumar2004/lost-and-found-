import React, { useState, useEffect } from 'react';
import axios from 'axios'; // API call ke liye
import ItemCard from '../components/ItemCard';

const LostItemsPage = () => {
  // Step 1: Zaroori states banana
  const [items, setItems] = useState([]); // Items ki list store karne ke liye
  const [loading, setLoading] = useState(true); // Loading state ke liye
  const [error, setError] = useState(null); // Error state ke liye

  // Step 2: useEffect se data fetch karna
  useEffect(() => {
    // Ek function banate hain data fetch karne ke liye
    const fetchItems = async () => {
      try {
        // Backend API ko call karo
        const response = await axios.get('http://localhost:5000/api/items');
        
        // Sirf 'lost' items ko filter karo
        const lostItems = response.data.filter(item => item.type === 'lost');
        setItems(lostItems); // State mein items daal do

      } catch (err) {
        setError('Could not fetch items. Please try again later.'); // Error state set karo
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false); // Loading khatm karo (chahe success ho ya error)
      }
    };

    fetchItems(); // Function ko call karo
  }, []); // Khaali array `[]` ka matlab hai yeh effect sirf ek baar chalega

  // Step 3: Loading aur Error states ke hisaab se UI dikhana
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // Step 4: Asli data ko map karke ItemCard dikhana
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lost Items
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          // Har item ke liye ek ItemCard banao aur usko 'item' data as a prop bhejo
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LostItemsPage;