// frontend/src/components/StarRatingComponent.jsx

import React from 'react';

const StarRatingComponent = ({ rating }) => {
  const stars = Array(5).fill(0).map((_, index) => {
    return index < rating ? '\u2605' : '\u2606';
  });

  return (
    <div>
      {stars.map((star, index) => (
        <span key={index} style={{color: '#007bff'}}>{star}</span>
      ))}
    </div>
  );
};

export default StarRatingComponent;