// frontend/src/pages/RecipientDash.jsx

import React from 'react';
import MapComponent from '../components/MapComponent';

const RecipientDash = () => {
  return (
    <div className="h-screen grid grid-cols-3 grid-rows-6 gap-4 p-4">
      <div className="bg-base-200 p-4 rounded-box col-span-1">Rating:</div>
      <div className="bg-base-200 p-4 rounded-box col-span-1">Account:</div>
      <div className="bg-base-200 p-4 rounded-box row-span-2">Capacity:</div>
      <div className="bg-base-200 p-0 rounded-box col-span-2 row-span-4 overflow-hidden" style={{ gridColumn: '1 / 3', gridRow: '2 / 6' }}>
        <MapComponent />
      </div>
      <div className="bg-base-200 p-4 rounded-box">Location:</div>
      <div className="bg-base-200 p-4 rounded-box">Destination:</div>
      <div className="bg-base-200 p-4 rounded-box">Date / Time of travel:</div>
      <div className="bg-base-200 p-4 rounded-box row-span-2">Price: </div>
      <div className="bg-base-200 p-4 rounded-box row-span-2">Notes: </div>
      <div className="bg-base-200 p-4 rounded-box row-span-2">Go-Online:</div>
    </div>
  );
};

export default RecipientDash;