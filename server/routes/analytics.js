const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// GET /api/analytics/:linkId
router.get('/:linkId', authMiddleware, async (req, res) => {
  try {
    const { linkId } = req.params;
    const userId = req.user.userId;

    const link = await pool.query('SELECT id FROM links WHERE id = $1 AND user_id = $2', [linkId, userId]);
    if (link.rows.length === 0) {
      return res.status(404).json({ msg: 'Link not found or unauthorized' });
    }

    const totalClicksResult = await pool.query('SELECT COUNT(*) FROM clicks WHERE link_id = $1', [linkId]);
    const totalClicks = parseInt(totalClicksResult.rows[0].count, 10);

    const clicksOverTimeResult = await pool.query(
      `SELECT DATE_TRUNC('day', clicked_at) AS date, COUNT(*) AS count
       FROM clicks
       WHERE link_id = $1 AND clicked_at > NOW() - INTERVAL '30 days'
       GROUP BY date
       ORDER BY date ASC`,
      [linkId]
    );

    res.json({
      totalClicks,
      clicksOverTime: clicksOverTimeResult.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;