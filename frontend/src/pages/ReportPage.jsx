import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Page redirect ke liye

// Yeh BIT Mesra ke locations ki list hai
const BIT_LOCATIONS = [
  'Library', 'Main Building', 'Lecture Halls (LH/SH)', 'Workshop', 'Cafeteria',
  'Canteen', 'Hostel Area (NH/GH/PG)', 'Sports Complex', 'SAC', 'Parking',
  'Auditorium', 'Admin Block', 'Bus Stop / Gate', 'Campus Roads', 'Health Center', 'Other'
];

const ReportPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // useNavigate hook ko initialize karo

  const onSubmit = async (data) => {
    try {
      console.log('Form data submitted:', data);
      // Ab hum backend API ko call karke data save karenge
      const response = await axios.post('http://localhost:5000/api/items', data);
      console.log('Server response:', response.data);
      alert('Item reported successfully!');
      // Success hone par user ko homepage par bhej do
      navigate('/'); 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to report item. Please check the console for details.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Report an Item
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Item Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Type*</label>
          <div className="flex space-x-4">
            <label className="flex items-center"><input type="radio" value="lost" {...register('type', { required: 'Please select item type' })} className="mr-2"/> Lost</label>
            <label className="flex items-center"><input type="radio" value="found" {...register('type', { required: 'Please select item type' })} className="mr-2"/> Found</label>
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
        </div>

        {/* Item Name */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Item Name*</label>
          <input id="title" type="text" {...register('title', { required: 'Item name is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category*</label>
          <select id="category" {...register('category', { required: 'Category is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Personal Items">Personal Items</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
            <option value="ID Cards">ID Cards</option>
            <option value="Others">Others</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description*</label>
          <textarea id="description" {...register('description', { required: 'Description is required' })} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Date Lost/Found */}
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date Lost/Found*</label>
          <input id="date" type="date" {...register('date', { required: 'Date is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location*</label>
          <select id="location" {...register('location', { required: 'Location is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a location</option>
            {BIT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* Contact Name */}
        <div>
          <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">Your Name*</label>
          <input id="contactName" type="text" {...register('contactName', { required: 'Your name is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">Your Email*</label>
          <input id="contactEmail" type="email" {...register('contactEmail', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
        </div>

        {/* Contact Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">Your Phone*</label>
          <input id="contactPhone" type="tel" {...register('contactPhone', { required: 'Phone number is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
