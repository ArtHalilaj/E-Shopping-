// controllers/memberController.js
import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Get all members
// @route   GET /api/members
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
    const [members] = await pool.query('SELECT * FROM member'); // Replace `member` with your actual member table name
    res.status(200).json(members);
});

// @desc    Create a new member
// @route   POST /api/members
// @access  Public
const createMember = asyncHandler(async (req, res) => {
    const { MemberID, Name, Role, GroupID } = req.body;

    if (!MemberID || !Name || !Role || !GroupID) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const [result] = await pool.query(
        'INSERT INTO member (MemberID, Name, Role, GroupID) VALUES (?, ?, ?, ?)',
        [MemberID, Name, Role, GroupID]
    );

    res.status(201).json({ MemberID: result.insertId, Name, Role, GroupID });
});

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Public
const updateMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { Name, Role, GroupID } = req.body;

    const [result] = await pool.query(
        'UPDATE member SET Name = ?, Role = ?, GroupID = ? WHERE MemberID = ?',
        [Name, Role, GroupID, id]
    );

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Member not found');
    }

    res.status(200).json({ id, Name, Role, GroupID });
});

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Public
const deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM member WHERE MemberID = ?', [id]);

    if (result.affectedRows === 0) {
        res.status(404);
        throw new Error('Member not found');
    }

    res.status(200).json({ message: 'Member removed' });
});

export { getMembers, createMember, updateMember, deleteMember };
