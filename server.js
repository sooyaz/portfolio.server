// .env 파일의 환경 변수를 로드합니다.
require('dotenv').config();

const express = require('express');
// cors 라이브러리 불러오기
const cors = require('cors');
 // jsonwebtoken 라이브러리 불러오기
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 9999;

// JSON 데이터 파싱 및 CORS 설정
app.use(express.json()); // JSON 형식의 요청 본문을 파싱
app.use(cors()); // 모든 도메인에서의 요청을 허용 (개발용)

app.get('/', (req, res) => {
  let test = {
    test : "hello"
  }
  res.send(test);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});