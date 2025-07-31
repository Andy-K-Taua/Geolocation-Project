// backend/src/routes/rating.route.js

import { Router } from 'express';
const router = Router();
import { createRating, getRatings, getAverageRating } from '../controllers/rating.controller.js';

router.post('/', createRating);
router.get('/:itemId', getRatings);
router.get('/average/:itemId', getAverageRating);

export default router;