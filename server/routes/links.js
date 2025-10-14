const express = require('express');
const router = express.Router();
const pool = require('../db');
const { nanoid } = require('nanoid');
const authMiddleware = require('../middleware/auth');

// POST /api/links
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { longUrl } = req.body;
    const userId = req.user.userId;
    const shortCode = nanoid(8);
    const newLink = await pool.query(
      'INSERT INTO links (user_id, long_url, short_code) VALUES ($1, $2, $3) RETURNING *',
      [userId, longUrl, shortCode]
    );
    res.json(newLink.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('4Server Error');
  }
});

// GET /api/links
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userLinks = await pool.query(
      'SELECT * FROM links WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(userLinks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('5Server Error');
  }
});

module.exports = router;