// frontend/src/pages/OriginDash.jsx

import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import GeocodeComponent from '../components/GeocodeComponent';
import AverageRatingComponent from '../components/AverageRatingComponent';
import CalendarComponnet from '../components/CalendarComponnet';

const OriginDash = () => {
  const [start, setLocation] = useState('');
  const [end, setDestination] = useState('');
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [geocodeStart, setGeocodeStart] = useState('');
  const [geocodeEnd, setGeocodeEnd] = useState('');
  const [capacityStatus, setCapacityStatus] = useState(false);

  const handleGeocodeStart = (coords) => {
    setStartCoords(coords);
  };

  const handleGeocodeEnd = (coords) => {
    setEndCoords(coords);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleKeyPressStart = (e) => {
    if (e.key === 'Enter') {
      console.log(`Start location: Enter key pressed with value: ${start}`);
      setGeocodeStart(start);
    }
  };

  const handleKeyPressEnd = (e) => {
    if (e.key === 'Enter') {
      console.log(`End location: Enter key pressed with value: ${end}`);
      setGeocodeEnd(end);
    }
  };

  const handleToggleCapacity = () => {
    setCapacityStatus(!capacityStatus);
  };

  return (
    <div className="h-screen grid grid-cols-3 grid-rows-6 gap-4 p-4">
      <div className="bg-base-200 p-4 rounded-box col-span-1">Ratings:
        <AverageRatingComponent itemId="origin-item-id" />
      </div>

      <div className="bg-base-200 p-4 rounded-box col-span-1 flex justify-between">
        <div>Setup</div>
        <div>
          <button onClick={null}>
            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" alt="PayPal" /> {/*this will be its own component*/}
          </button>
        </div>
      </div>

      <div className="bg-base-200 p-4 rounded-box row-span-2">
        <div className="mb-2 flex justify-between items-center">
          <span className="mr-2">{capacityStatus ? 'Moving Object' : 'Stagnant Space'}</span>
          <input
            type="checkbox"
            className="toggle border-2 border-blue-400 checked:border-blue-400"
            checked={capacityStatus}
            onChange={handleToggleCapacity}
          />
        </div>Capacity:
      </div>
      <div className="bg-base-200 p-0 rounded-box col-span-2 row-span-4 overflow-hidden" style={{ gridColumn: '1 / 3', gridRow: '2 / 6' }}>
        <MapComponent start={startCoords} end={endCoords} />
      </div>
      <div className="bg-base-200 p-4 rounded-box">
        <label className="block text-sm mb-2">Location:</label>
        <input
          type="text"
          value={start}
          onChange={handleLocationChange}
          onKeyDown={handleKeyPressStart}
          placeholder="Enter location"
          className="input input-bordered w-full"
        />
        <GeocodeComponent address={geocodeStart} onGeocode={handleGeocodeStart} />
      </div>
      <div className="bg-base-200 p-4 rounded-box">
        <label className="block text-sm mb-2">Destination:</label>
        <input
          type="text"
          value={end}
          onChange={handleDestinationChange}
          onKeyDown={handleKeyPressEnd}
          placeholder="Enter destination"
          className="input input-bordered w-full"
        />
        <GeocodeComponent address={geocodeEnd} onGeocode={handleGeocodeEnd} />
      </div>
      <div className="bg-base-200 p-4 rounded-box">
        <div>Date / Time of Listing:</div>
        <CalendarComponnet />
      </div>
      <div className="bg-base-200 p-4 rounded-box">Price: </div>
      <div className="bg-base-200 p-4 rounded-box items-center gap-2">Notes:</div>
      <div className="bg-base-200 p-4 rounded-box">Go-Online:</div>
    </div>
  );
};

export default OriginDash;