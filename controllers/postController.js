const postService = require('../services/postServices');

const getPost = async (req, res) => {
  const id = parseInt(req.params.id || '1', 10);
  const boardType = parseInt(req.params.boardType || '1', 10);
  try {
    const post = await postService.getPost(boardType, id);

    res.status(201).json({
      post: post,
      message:"게시물이 정상적으로 조회되었습니다."
    })
  } catch(err) {
    console.error("게시물 조회 실패:", err);
    res.status(500).json({
      message: "게시물 조회에 실패했습니다."
    })
  }
}

const getPosts = async (req, res) => {
  const type = parseInt(req.query.boardType || '1', 10);
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);

  try {
    const postCounts = await postService.getPostsCount(type);
    const posts = await postService.getPosts(type, page, limit);

    res.status(201).json({
      totalCount: postCounts,
      list: posts,
      message:"현재 페이지의 게시물들이 정상적으로 조회되었습니다."
    })
  } catch(err) {
    console.error("현재 페이지 게시물 조회 실패:", err);
    res.status(500).json({
      message: "현제 페이지 게시물 조회에 실패했습니다."
    })
  }
}
const updateViews = async (req, res) => {
  const id = parseInt(req.params.id || '1', 10);
  
  try {
    await postService.updateViews(id);
    res.status(200).json({ message: '조회수가 성공적으로 업데이트되었습니다.' });
  } catch (err) {
    console.error('조회수 업데이트 중 오류 발생:', err);
    res.status(500).json({ message: '조회수 업데이트 중 서버 오류가 발생했습니다.' });
  }
}

const getPostsCount = async (req, res) => {
  try {
    const postCounts = await postService.getPostsCount();
    res.status(201).json({
      totalCount: postCounts,
      message:"전체 게시물 갯수가 성공적으로 조회되었습니다."
    })
  } catch(err) {
    console.error("전체 게시물 조회 실패:", err);
    res.status(500).json({
      message: "전체 게시물 갯수 조회에 실패했습니다."
    })
  }
}
const insertPost = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = await postService.insertPost(postData);
    res.status(201).json({
      message:"게시물이 성공적으로 작성되었습니다."
    })
  } catch(err) {
    console.error("게시물 작성 중 오류:", err);
    res.status(500).json({
      message: "게시물 작성에 실패했습니다."
    })
  }
}
const insertAttachments = async () => {
  
}

const postController = {
  getPost,
  getPosts,
  getPostsCount,
  insertPost,
  updateViews,
  insertAttachments
}
module.exports = postController;