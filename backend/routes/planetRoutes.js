import express from 'express';
import {
    getPlanets,
    createPlanet,
    updatePlanet,
    deletePlanet
} from '../controllers/planetController.js';

const router = express.Router();

// Define routes for planets
router.route('/').get(getPlanets).post(createPlanet);
router.route('/:PlanetID').put(updatePlanet).delete(deletePlanet);

export default router;
