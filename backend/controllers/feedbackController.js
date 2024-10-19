import asyncHandler from '../middleware/asyncHandler.js';
import pool from '../config/mysql-db.js';

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
const addFeedback = asyncHandler(async (req, res) => {
  const { text, clientEmail } = req.body;
  console.log("tekst");

  console.log(text)
  if (!text || !clientEmail) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO client_feedbacks (feedbackText, clientEmail) VALUES (?, ?)',
      [text, clientEmail]
    );
    res.status(201).json({ id: result.insertId, text, clientEmail });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});

export { addFeedback };
