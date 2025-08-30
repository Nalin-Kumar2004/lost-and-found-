import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReportModal from '../components/ReportModal'; // <-- Modal ko import karo

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal ke liye naya state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/items/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('Could not fetch item details. The item may not exist.');
        console.error("Error fetching item details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItemDetails();
  }, [id]);

  // if (loading) return <div className="text-center p-10">Loading item details...</div>;
   // --- YAHAN BADLAAV KIYA HAI ---
  if (loading) {
    // "Loading..." text ki jagah Spinner component use karo
    return <Spinner />;
  }


  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!item) return <div className="text-center p-10">Item not found.</div>;

  return (
    <> {/* Fragment ka use karo taaki modal bhi aa sake */}
      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        itemId={id}
      />
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ... (Image aur baaki details waise hi rahenge) ... */}
          <div>
            <img src={item.imageUrl || 'https://via.placeholder.com/600x400.png/007bff/ffffff?text=No+Image'} alt={item.title} className="w-full h-auto rounded-lg object-cover"/>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Item
            </span>
            <div className="border-t pt-4">
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Category:</strong> {item.category}</p>
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Location:</strong> {item.location}</p>
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Date:</strong> {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
            </div>
            <div className="border-t pt-4 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Name:</strong> {item.contactName}</p>
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Email:</strong> <a href={`mailto:${item.contactEmail}`} className="text-blue-600 hover:underline">{item.contactEmail}</a></p>
              <p className="text-gray-600"><strong className="font-medium text-gray-800">Phone:</strong> <a href={`tel:${item.contactPhone}`} className="text-blue-600 hover:underline">{item.contactPhone}</a></p>
            </div>
            
            {/* ===== NAYA BUTTON YAHAN HAI ===== */}
            <div className="border-t pt-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-red-600 hover:underline"
              >
                Report this post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailsPage;
