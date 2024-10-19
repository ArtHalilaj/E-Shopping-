import express from 'express';
import { addBotuesi, getBotuesi, updateBotuesi, deleteBotuesi } from '../controllers/botuesiController.js';

const router = express.Router();

router.route('/')
  .post(addBotuesi)   // Create a new group
  .get(getBotuesi);  // Get all groups

router.route('/:PublisherID')
  .put(updateBotuesi)   // Update a group by ID
  .delete(deleteBotuesi);  // Delete a group by ID

export default router;
