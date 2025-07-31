const postService = require('../services/postServices');

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);

  try {
    const postCounts = await postService.getPostsCount();
    const posts = await postService.getPosts(page, limit);

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
    console.log("@@@", newPost)
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
const updateViews = async () => {

}

const postController = {
  getPosts,
  getPostsCount,
  insertPost,
  updateViews,
  insertAttachments
}
module.exports = postController;