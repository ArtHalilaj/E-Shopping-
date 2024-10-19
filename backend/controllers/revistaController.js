// controllers/memberController.js
import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Public
const getMagazine = asyncHandler(async (req, res) => {
    const [members] = await pool.query('SELECT * FROM revista'); // Replace `revista` with your actual revista table name
    res.status(200).json(magazine
    );
});

// @desc    Create a new member
// @route   POST /api/members
// @access  Public
const createMagazine = asyncHandler(async (req, res) => {
    const { MagazineID, MagazineName, IssueNumber, PublisherID } = req.body;

    if (!MagazineID || !MagazineName || !IssueNumber || !PublisherID) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const [result] = await pool.query(
        'INSERT INTO revista (MagazineID, MagazineName, IssueNumber, PublisherID) VALUES (?, ?, ?, ?)',
        [MagazineID, MagazineName, IssueNumber, PublisherID]
    );

    res.status(201).json({ MagazineID: result.insertId, MagazineName, IssueNumber, PublisherID });
});

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Public
const updateMagazine = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { MagazineName, IssueNumber, PublisherID } = req.body;

    const [result] = await pool.query(
        'UPDATE revista SET MagazineName = ?, IssueNumber = ?, PublisherID = ? WHERE MagazineID = ?',
        [MagazineName, IssueNumber, PublisherID, id]
    );

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Member not found');
    }

    res.status(200).json({ id, MagazineName, IssueNumber, PublisherID });
});

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Public
const deleteMagazine = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM revista WHERE MagazineID = ?', [id]);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Member not found');
    }

    res.status(200).json({ message: 'Member removed' });
});

export { getMagazine, createMagazine, updateMagazine, deleteMagazine };
