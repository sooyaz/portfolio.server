const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

// 사용자 등록 라우트
router.post('/sign-up', AuthController.signUp);
// 사용자 로그인 라우트
router.post('/login', AuthController.login);
// 사용자 중복 검사 라우트
router.post('/check-duplicate', AuthController.checkDuplicate);

module.exports = router;