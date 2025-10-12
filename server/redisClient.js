const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection failed:', err);
  }
};

connectRedis();

module.exports = redisClient;