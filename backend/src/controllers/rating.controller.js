// backend/src/controllers/rating.controller.js

import Rating from '../models/rating.model.js';

export async function createRating(req, res) {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getRatings(req, res) {
  try {
    const ratings = await find({ itemId: req.params.itemId });
    res.json(ratings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getAverageRating(req, res) {
  try {
    const ratings = await find({ itemId: req.params.itemId });
    const average = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
    res.json({ average });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}