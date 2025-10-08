const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1', // or your Redis server host
  port: 6379,        // default Redis port
  // password: 'your_password' // uncomment if Redis requires auth
});

redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis connection error:', err));

module.exports = redis;
