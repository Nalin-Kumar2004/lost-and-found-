import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReportModal = ({ isOpen, onClose, itemId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reports`, { ...data, itemId });
      toast.success('Report submitted successfully. Thank you!');
      reset();
      onClose(); // Modal band kar do
    } catch (error) {
      toast.error('Failed to submit report.');
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Report this Post</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">Reason*</label>
            <select
              id="reason"
              {...register('reason', { required: 'Please select a reason' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select a Reason --</option>
              <option value="Spam">Spam</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Item Resolved/Found">Item Resolved/Found</option>
              <option value="Duplicate Post">Duplicate Post</option>
              <option value="Other">Other</option>
            </select>
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
            <textarea
              id="message"
              rows="3"
              {...register('message')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
