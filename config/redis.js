// config/redis.js
const Redis = require('ioredis');
// .env 파일을 로드하기 위해 dotenv 패키지를 사용합니다.
// Next.js API Routes에서는 Next.js가 자동으로 환경 변수를 로드하지만,
// Express와 동일한 파일 공유 및 일관성을 위해 require('dotenv').config()를 포함하는 것이 좋습니다.
require('dotenv').config(); 

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',  // 윈도우에서 WSL의 Redis에 접근 시 'localhost' 사용
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined, // Redis에 비밀번호가 있다면 입력
  db: parseInt(process.env.REDIS_DB || '0', 10),
});

// Redis 연결 성공/실패 이벤트 리스너
redisClient.on('connect', () => {
  console.log('Redis connected successfully!');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
  // 실제 애플리케이션에서는 여기서 적절한 에러 처리 로직을 구현해야 합니다.
});

module.exports = redisClient;