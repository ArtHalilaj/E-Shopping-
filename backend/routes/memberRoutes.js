// routes/memberRoutes.js
import express from 'express';
import {
    getMembers,
    createMember,
    updateMember,
    deleteMember
} from '../controllers/memberController.js';

const router = express.Router();

router.route('/').get(getMembers).post(createMember);
router.route('/:id').put(updateMember).delete(deleteMember);

export default router;
