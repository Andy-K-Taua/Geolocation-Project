// frontend/src/components/GeocodeComponent.jsx

import React, { useState, useEffect } from 'react';

const GeocodeComponent = ({ address, onGeocode }) => {
  const geocodeAddress = async () => {
    if (!address) {
      console.log('Please enter a valid address.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/geocode?q=${address}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        onGeocode([lon, lat]);
      } else {
        console.log('No geocode data found for the given address.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    geocodeAddress();
  }, [address]);

  return null;
};

export default GeocodeComponent;