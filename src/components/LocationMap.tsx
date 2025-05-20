'use client';
import React from 'react';

const LocationMap = () => {
  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-medium mb-4">Where you’ll be</h2>
      <p className="mb-2 text-gray-600">Kanakapura, Karnataka</p>
      <div className="w-full h-64 rounded-lg overflow-hidden">
        <iframe
  src="https://www.google.com/maps?q=No.122,+Saalu+Hunase+Village,+Opp.+Anjaneya+Temple,+Udayapura+Post,+Kanakapura+Main+Rd,+Bengaluru,+Karnataka+560082&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LocationMap;
