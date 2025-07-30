// frontend/src/components/AverageRatingComponent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatingComponent from './StarRatingComponent';

const AverageRatingComponent = ({ itemId }) => {
  const [averageRating, setAverageRating] = useState(0);

  const getAverageRating = async () => {
    try {
      const response = await axios.get(`/api/ratings/average/${itemId}`);
      setAverageRating(response.data.average);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAverageRating();
  }, [itemId]);

  return (
    <div>
      <StarRatingComponent rating={averageRating} />
    </div>
  );
};

export default AverageRatingComponent;