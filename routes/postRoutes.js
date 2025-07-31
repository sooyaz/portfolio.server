// routes/userRoutes.js
const express = require('express');
const router = express.Router(); // Express 라우터 인스턴스 생성

const postController = require('../controllers/postController'); // 컨트롤러 임포트

//전체 게시물 갯수 가져오기
router.get('/get-posts-count', postController.getPostsCount);
// 게시물 목록 가져오기
router.get('/get-posts', postController.getPosts);
// 게시물 작성
router.post('/insert-post', postController.insertPost);
// 첨부파일 저장
router.post('/insert-attachments', postController.insertAttachments);
// 게시물 수정
// router.post('/check-duplicate', userController.checkDuplicate);
// 게시물 조회수 업데이트
router.post('/update-views', postController.updateViews);

// 라우터를 모듈로 내보냅니다.
module.exports = router;