// routes/userRoutes.js
const express = require('express');
const router = express.Router(); // Express 라우터 인스턴스 생성

const userController = require('../controllers/userController'); // 컨트롤러 임포트

// 사용자 등록 라우트
router.post('/register', userController.registerUser);
// 사용자 로그인 라우트
router.post('/login', userController.loginUser);
// 사용자 중복 검사 라우트
router.post('/check-duplicate', userController.checkDuplicate);

// 라우터를 모듈로 내보냅니다.
module.exports = router;