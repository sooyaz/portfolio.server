// .env 파일의 환경 변수를 로드합니다.
require('./config/env');

const express = require('express');
const cookieParser = require('cookie-parser');
// cors 라이브러리 불러오기
const cors = require('cors');

// 인증 라우트 임포트
const authRoutes = require('./routes/authRoutes');
// 게시물 라우트 임포트
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 9999;

// JSON 데이터 파싱 및 CORS 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
})); // 모든 도메인에서의 요청을 허용 (개발용)

app.use('/api/auth', authRoutes);
// 게시판 게시글 관련 API
app.use('/api/post', postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});