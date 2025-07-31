// backend/src/models/rating.model.js

import { Schema, model } from 'mongoose';

const ratingSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true }, // You can replace this with the actual model reference
});

export default model('Rating', ratingSchema);