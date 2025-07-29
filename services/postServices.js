// services/postService.js
const db = require('../config/db');

const insertPost = async (formData) => {
  // const sql = ``;
  // const { title, content, userName, userMail } = formData;
  // const hashedPassword = await bcrypt.hash(userPW, saltRounds);

  // const query = `INSERT INTO \`vellod\`.\`tb_member\` (\`user_id\`, \`user_name\`, \`user_password\`, \`user_email\`)
  //                VALUES (${userID}, ${userName}, ${hashedPassword}, ${userMail})`;

  // await db.query(query, [userID, userName, hashedPassword, userMail]);
  // console.log(`사용자 ${userID} 등록 성공`);
}

const postService = {
  insertPost
}
module.exports = postService;