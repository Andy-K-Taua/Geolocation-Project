// frontend/src/components/RatingComponent.jsx

import React, { useState } from 'react';
import axios from 'axios';

const RatingComponent = ({ itemId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ratings', {
        rating,
        review,
        itemId,
        userId: 'currentUserId', // Replace with actual user ID
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {[1, 2, 3, 4, 5].map((rate) => (
            <span key={rate} onClick={() => handleRating(rate)}>
              {rate <= rating ? '\u2605' : '\u2606'}
            </span>
          ))}
        </div>
        <textarea value={review} onChange={handleReview} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RatingComponent;