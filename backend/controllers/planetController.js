import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Get all planets
// @route   GET /api/planets
// @access  Public
const getPlanets = asyncHandler(async (req, res) => {
    const [planets] = await pool.query('SELECT * FROM planet WHERE isDeleted = false'); // Fetch only non-deleted planets
    res.status(200).json(planets);
});

// @desc    Create a new planet
// @route   POST /api/planets
// @access  Public
const createPlanet = asyncHandler(async (req, res) => {
    const { PlanetID, Name, Type, isDeleted } = req.body;

    if (!PlanetID || !Name || !Type) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const [result] = await pool.query(
        'INSERT INTO planet (PlanetID, Name, Type, isDeleted) VALUES (?, ?, ?, ?)',
        [PlanetID, Name, Type, isDeleted]
    );

    res.status(201).json({ PlanetID: result.insertId, Name, Type, isDeleted });
});

// @desc    Update a planet
// @route   PUT /api/planets/:PlanetID
// @access  Public
const updatePlanet = asyncHandler(async (req, res) => {
    const { PlanetID } = req.params;
    const { Name, Type, isDeleted } = req.body;

    const [result] = await pool.query(
        'UPDATE planet SET Name = ?, Type = ?, isDeleted = ? WHERE PlanetID = ?',
        [Name, Type, isDeleted, PlanetID]
    );

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Planet not found');
    }

    res.status(200).json({ PlanetID, Name, Type, isDeleted });
});

// @desc    Delete a planet
// @route   DELETE /api/planets/:PlanetID
// @access  Public
const deletePlanet = asyncHandler(async (req, res) => {
    const { PlanetID } = req.params;

    const [result] = await pool.query('DELETE FROM planet WHERE PlanetID = ?', [PlanetID]);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Planet not found');
    }

    res.status(200).json({ message: 'Planet removed' });
});

export { getPlanets, createPlanet, updatePlanet, deletePlanet };
