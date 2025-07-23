// .env 파일의 환경 변수를 로드합니다.
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
// cors 라이브러리 불러오기
const cors = require('cors');

// 사용자 라우트 설정
const userRoutes = require('./routes/userRoutes');
// 인증 라우트 임포트
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 9999;

// JSON 데이터 파싱 및 CORS 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(cookieParser());
app.use(cors()); // 모든 도메인에서의 요청을 허용 (개발용)

app.use('/api/auth', authRoutes); // /api/auth/login, /api/auth/refresh 등
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});