import express from 'express';
const router = express.Router();
import { addFeedback } from '../controllers/feedbackController.js';

router.route('/').post(addFeedback);

export default router;
