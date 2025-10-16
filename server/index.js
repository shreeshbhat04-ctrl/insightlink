const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');
const redisClient = require('./redisClient');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- REDIRECTION ROUTE ---
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    // 1. Check Redis Cache First
    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
      console.log(`Cache HIT for ${shortCode}`);
      // Log click data asynchronously without slowing down the user
      const linkQuery = await pool.query('SELECT id FROM links WHERE short_code = $1', [shortCode]);
      if(linkQuery.rows.length > 0) {
        pool.query('INSERT INTO clicks (link_id, ip_address, user_agent) VALUES ($1, $2, $3)', [linkQuery.rows[0].id, req.ip, req.headers['user-agent']]);
      }
      return res.redirect(301, cachedUrl);
    }

    // 2. CACHE MISS: Query the database
    console.log(`Cache MISS for ${shortCode}`);
    const linkQuery = await pool.query('SELECT id, long_url FROM links WHERE short_code = $1', [shortCode]);

    if (linkQuery.rows.length === 0) {
      return res.status(404).send('URL not found.');
    }
    const link = linkQuery.rows[0];

    // 3. Store the result in Redis for next time (expires in 24 hours)
    await redisClient.set(shortCode, link.long_url, { EX: 86400 });
    
    // Log the click
    pool.query('INSERT INTO clicks (link_id, ip_address, user_agent) VALUES ($1, $2, $3)', [link.id, req.ip, req.headers['user-agent']]);

    return res.redirect(301, link.long_url);
  } catch (err) {
     console.error('Redirection Route Error:', err);
    res.status(500).send('Server Error');
  }
});

// --- API ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/analytics', require('./routes/analytics'));

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});