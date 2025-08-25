import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        About BIT Mesra Lost & Found
      </h1>
      <div className="space-y-4 text-gray-700">
        <p>
          This platform is a dedicated initiative for the students and staff of BIT Mesra. We understand how frustrating it can be to lose a valuable item on campus, and the uncertainty of finding it again. Similarly, finding something and not knowing how to return it to its rightful owner can be a challenge.
        </p>
        <p>
          Our mission is to bridge this gap by creating a simple, centralized, and efficient online hub where our campus community can report lost and found items.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 pt-4">
          How It Works
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Report an Item:</strong> If you've lost or found something, simply fill out the 'Report an Item' form with as much detail as possible, including a photo if you have one.</li>
          <li><strong>Search & Filter:</strong> Browse through the listings on the 'Lost Items' and 'Found Items' pages. Use the search and filter options to quickly narrow down the results.</li>
          <li><strong>Connect:</strong> If you find a match, use the contact information provided in the item details to connect with the other person and arrange a return.</li>
        </ul>
        <p className="pt-4 font-medium text-gray-800">
          This project is built with the spirit of community and helping one another. Let's make our campus a more connected and supportive place!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
