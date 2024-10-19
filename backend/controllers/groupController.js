import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Create a new group
// @route   POST /api/groups
// @access  Public
const addGroup = asyncHandler(async (req, res) => {
  const { GroupID, GroupName, Description } = req.body;

  if (!GroupID || !GroupName || !Description) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO groupform (GroupID, GroupName, Description) VALUES (?, ?, ?)',
      [GroupID, GroupName, Description]
    );
    res.status(201).json({ id: result.insertId, GroupID, GroupName, Description });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all groups
// @route   GET /api/groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM groupform');
    res.status(200).json(rows);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Update a group
// @route   PUT /api/groups/:GroupID
// @access  Public
const updateGroup = asyncHandler(async (req, res) => {
  const { GroupName, Description } = req.body;
  const { GroupID } = req.params;

  if (!GroupName || !Description) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const [result] = await pool.query(
      'UPDATE groupform SET GroupName = ?, Description = ? WHERE GroupID = ?',
      [GroupName, Description, GroupID]
    );

    if (result.affectedRows === 0) {
      res.status(404);
      throw new Error('Group not found');
    }

    res.status(200).json({ GroupID, GroupName, Description });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Delete a group
// @route   DELETE /api/groups/:GroupID
// @access  Public
const deleteGroup = asyncHandler(async (req, res) => {
  const { GroupID } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM groupform WHERE GroupID = ?', [GroupID]);

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

export { addGroup, getGroups, updateGroup, deleteGroup };
