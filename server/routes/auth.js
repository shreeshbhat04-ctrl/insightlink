const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(401).send('User already exists.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error('--- REGISTER ROUTE CRASH ---', err); // Enhanced logging
    res.status(500).send('Server Error');
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(401).json('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isMatch) {
      return res.status(401).json('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.rows[0].id }, 'your_jwt_secret');
    res.json({ token });
  } catch (err) {
    // This is the updated line for better debugging
    console.error('--- LOGIN ROUTE CRASH ---', err); 
    res.status(500).send('Server Error');
  }
});

module.exports = router;