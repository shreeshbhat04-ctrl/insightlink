const pool = require('./db');

// Initialize cache table (run on startup)
const initializeCacheTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cache (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `);
    
    // Create index for expired entries cleanup
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON cache(expires_at);
    `);
    
    console.log('Cache table initialized');
  } catch (err) {
    console.error('Error initializing cache table:', err);
  }
};

// Call on module load
initializeCacheTable();

// Get value from cache
const get = async (key) => {
  try {
    const result = await pool.query(
      'SELECT value FROM cache WHERE key = $1 AND expires_at > NOW()',
      [key]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0].value;
    }
    return null;
  } catch (err) {
    console.error('Cache get error:', err);
    return null;
  }
};

// Set value in cache with optional expiration (in seconds)
const set = async (key, value, options = {}) => {
  try {
    const expiresAt = new Date(Date.now() + (options.EX || 3600) * 1000);
    
    await pool.query(
      `INSERT INTO cache (key, value, expires_at) 
       VALUES ($1, $2, $3)
       ON CONFLICT (key) DO UPDATE SET value = $2, expires_at = $3`,
      [key, value, expiresAt]
    );
    
    return true;
  } catch (err) {
    console.error('Cache set error:', err);
    return false;
  }
};

// Delete from cache
const del = async (key) => {
  try {
    await pool.query('DELETE FROM cache WHERE key = $1', [key]);
    return true;
  } catch (err) {
    console.error('Cache delete error:', err);
    return false;
  }
};

// Clear all expired entries
const clearExpired = async () => {
  try {
    await pool.query('DELETE FROM cache WHERE expires_at <= NOW()');
  } catch (err) {
    console.error('Cache cleanup error:', err);
  }
};

// Run cleanup every hour
setInterval(clearExpired, 3600000);

module.exports = {
  get,
  set,
  del,
  clearExpired
};
