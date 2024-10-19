import express from 'express';
import { addGroup, getGroups, updateGroup, deleteGroup } from '../controllers/groupController.js';

const router = express.Router();

router.route('/')
  .post(addGroup)   // Create a new group
  .get(getGroups);  // Get all groups

router.route('/:GroupID')
  .put(updateGroup)   // Update a group by ID
  .delete(deleteGroup);  // Delete a group by ID

export default router;
