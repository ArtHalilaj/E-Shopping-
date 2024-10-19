import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Create a new group
// @route   POST /api/groups
// @access  Public
const addBotuesi = asyncHandler(async (req, res) => {
  const { PublisherID, PublisherName, Location } = req.body;

  if (!PublisherID || !PublisherName || !Location) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO botuesi (PublisherID, PublisherName, Location) VALUES (?, ?, ?)',
      [PublisherID, PublisherName, Location]
    );
    res.status(201).json({ id: result.insertId, PublisherID, PublisherName, Location });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
const getBotuesi = asyncHandler(async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM botuesi');
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a group
// @route   PUT /api/groups/:PublisherID
// @access  Public
const updateBotuesi = asyncHandler(async (req, res) => {
  const { PublisherName, Location } = req.body;
  const { PublisherID } = req.params;

  if (!PublisherName || !Location) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const [result] = await pool.query(
      'UPDATE botuesi SET PublisherName = ?, Location = ? WHERE PublisherID = ?',
      [PublisherName, Location, PublisherID]
    );

    if (result.affectedRows === 0) {
      res.status(404);
      throw new Error('Group not found');
    }

    res.status(200).json({ PublisherID, PublisherName, Location });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a group
// @route   DELETE /api/groups/:PublisherID
// @access  Public
const deleteBotuesi = asyncHandler(async (req, res) => {
  const { PublisherID } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM botuesi WHERE PublisherID = ?', [PublisherID]);

    if (result.affectedRows === 0) {
      res.status(404);
      throw new Error('Group not found');
    }

    res.status(200).json({ message: 'Group removed' });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

export { addBotuesi, getBotuesi, updateBotuesi, deleteBotuesi };
