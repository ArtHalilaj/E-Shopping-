// routes/memberRoutes.js
import express from 'express';
import {
    getMagazine,
    createMagazine,
    updateMagazine,
    deleteMagazine
} from '../controllers/revistaController.js';

const router = express.Router();

router.route('/').get(getMagazine).post(createMagazine);
router.route('/:id').put(updateMagazine).delete(deleteMagazine);

export default router;
