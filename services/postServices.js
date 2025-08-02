// services/postService.js
const db = require('../config/db');

const getPost = async (id) => {
  const query = `SELECT 
                        P.id
                        , C.category_name AS category
                        , M.user_name AS auth
                        , p.title
                        , p.content
                        , p.views
                        , p.thumbnail_url
                        , p.created_dt
                 FROM ${process.env.DB_NAME}.tb_posts AS P
                 JOIN ${process.env.DB_NAME}.tb_members AS M ON P.user_id = M.user_id
                 LEFT JOIN ${process.env.DB_NAME}.tb_categories AS C ON P.category_id = C.category_id
                 WHERE P.id = ${id}
                `;
  try{
    const [rows] = await db.execute(query);
    if(rows.length < 1){
      throw new Error('해당하는 게시물이 존재하지 않습니다.');
    }
    const list = rows[0];
    console.log("목록 확인해보자", rows);
    return list;
  }catch(err){
    console.log("ERROR: ", err);
    throw new Error('게시물 조회에 실패했습니다.');
  }
}

const getPosts = async (page, limit) => {
  const offset = (page - 1) * limit;
  const query = `SELECT 
                        P.id
                        , C.category_name AS category
                        , M.user_name AS auth
                        , p.title
                        , p.content
                        , p.views
                        , p.thumbnail_url
                        , p.created_dt
                 FROM ${process.env.DB_NAME}.tb_posts AS P
                 JOIN ${process.env.DB_NAME}.tb_members AS M ON P.user_id = M.user_id
                 LEFT JOIN ${process.env.DB_NAME}.tb_categories AS C ON P.category_id = C.category_id
                 ORDER BY P.created_dt DESC
                 LIMIT ${limit} OFFSET ${offset}
                `;
    console.log("목록 확인해보자", query);
  try{
    const [rows] = await db.execute(query);
    const list = rows.map(row=>({
      id: row.id,
      category: row.category,
      title: row.title,
      content: row.content,
      auth: row.auth,
      views: row.views,
      created_dt: row.created_dt
    }))
    console.log("목록 확인해보자", rows);
    return list;
  }catch(err){
    console.log("ERROR: ", err);
    throw new Error('게시물 갯수 조회에 실패했습니다.');
  }
}

const getPostsCount = async () => {
  const query = `SELECT COUNT(*) AS totalCount FROM \`${process.env.DB_NAME}\`.\`tb_posts\``;
  try{
    const [rows] = await db.execute(query);
    const resultCount = rows[0].totalCount;
    return resultCount;
  }catch(err){
    console.log("ERROR: ", err);
    throw new Error('게시물 갯수 조회에 실패했습니다.');
  }
}

const insertPost = async (postData) => {
  const { userID, title, content, boardType, category } = postData;
  const query = `INSERT INTO \`${process.env.DB_NAME}\`.\`tb_posts\` (\`user_id\`, \`title\`, \`content\`, \`board_type_id\`, \`category_id\`)
                 VALUES (?, ?, ?, ?, ?)`;
  // const query = `SELECT * FROM \`${process.env.DB_NAME}\`.\`tb_members\``;
  console.log("잘 저장 되었나", userID, title, content, boardType, category, query);
  try {
    const [rows] = await db.execute(query, [userID, title, content, boardType, category]);
    console.log("잘 저장 되었나", rows);

  } catch(err) {
    console.log("ERROR: ", err);
    throw new Error('게시물 작성에 실패했습니다.');
  }

  // const hashedPassword = await bcrypt.hash(userPW, saltRounds);

  // const query = `INSERT INTO \`vellod\`.\`tb_member\` (\`user_id\`, \`user_name\`, \`user_password\`, \`user_email\`)
  //                VALUES (${userID}, ${userName}, ${hashedPassword}, ${userMail})`;

  // await db.query(query, [userID, userName, hashedPassword, userMail]);
  // console.log(`사용자 ${userID} 등록 성공`);
}

const updateViews = async (id) => {
  const query = `UPDATE ${process.env.DB_NAME}.tb_posts SET views = views + 1 WHERE id = ${id}`;
  try{
    await db.execute(query);
  }catch(err){
    console.log("ERROR: ", err);
    throw new Error('게시물 조회에 실패했습니다.');
  }
}

const postService = {
  getPost,
  getPosts,
  getPostsCount,
  updateViews,
  insertPost
}
module.exports = postService;