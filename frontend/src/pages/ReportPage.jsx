import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// Step 1: useSearchParams ko react-router-dom se import karo
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const BIT_LOCATIONS = [ 'Library', 'Main Building', 'Lecture Halls (LH/SH)', 'Workshop', 'Cafeteria', 'Canteen', 'Hostel Area (NH/GH/PG)', 'Sports Complex', 'SAC', 'Parking', 'Auditorium', 'Admin Block', 'Bus Stop / Gate', 'Campus Roads', 'Health Center', 'Other' ];
const CATEGORIES = [ 'Electronics', 'Documents', 'Personal Items', 'Apparel', 'Accessories', 'ID Cards', 'Others' ];

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const ReportPage = () => {
  // Step 2: URL se 'type' parameter ko padhne ka setup
  const [searchParams] = useSearchParams();
  const formType = searchParams.get('type'); // Yeh 'lost' ya 'found' hoga

  // Step 3: useForm ko defaultValues do
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      type: formType || '' // Form load hote hi 'type' field ki value set kar do
    }
  });
  
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // onSubmit function mein koi badlaav nahi hai, woh waisa hi rahega
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let imageUrl = '';

    if (imageFile) {
      try {
        const timestamp = Date.now();
        const signResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/uploads/sign`, {
          timestamp,
          upload_preset: CLOUDINARY_UPLOAD_PRESET,
        });

        const { signature } = signResponse.data;

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('timestamp', timestamp);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('signature', signature);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
        const uploadResponse = await axios.post(cloudinaryUrl, formData);
        imageUrl = uploadResponse.data.secure_url;

      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        toast.error('Image upload failed. Please try again.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const finalData = { ...data, imageUrl };
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/items`, finalData);
      toast.success('Item reported successfully!');
      navigate('/');
    } catch (dbError) {
      console.error('Error submitting form to DB:', dbError);
      toast.error('Failed to report item. Please check the console.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Report an Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        {/* Baaki saara form ka JSX bilkul waisa hi rahega */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Type*</label>
          <div className="flex space-x-4">
            <label className="flex items-center"><input type="radio" value="lost" {...register('type', { required: 'Please select item type' })} className="mr-2"/> Lost</label>
            <label className="flex items-center"><input type="radio" value="found" {...register('type', { required: 'Please select item type' })} className="mr-2"/> Found</label>
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
        </div>
        
        {/* Baaki saare form fields... */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Item Name*</label>
          <input id="title" type="text" {...register('title', { required: 'Item name is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category*</label>
          <select id="category" {...register('category', { required: 'Category is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description*</label>
          <textarea id="description" {...register('description', { required: 'Description is required' })} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date Lost/Found*</label>
          <input id="date" type="date" {...register('date', { required: 'Date is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Location*</label>
          <select id="location" {...register('location', { required: 'Location is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a location</option>
            {BIT_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>
        <div>
          <label htmlFor="contactName" className="block text-gray-700 font-medium mb-2">Your Name*</label>
          <input id="contactName" type="text" {...register('contactName', { required: 'Your name is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-gray-700 font-medium mb-2">Your Email*</label>
          <input id="contactEmail" type="email" {...register('contactEmail', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
        </div>
        <div>
          <label htmlFor="contactPhone" className="block text-gray-700 font-medium mb-2">Your Phone*</label>
          <input id="contactPhone" type="tel" {...register('contactPhone', { required: 'Phone number is required' })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image (Optional)</label>
          <input id="image" type="file" onChange={(e) => { if (e.target.files[0]) { setImageFile(e.target.files[0]); } }} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400">
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
