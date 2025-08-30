import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
