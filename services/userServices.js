// services/userService.js
const db = require('../config/db'); // 데이터베이스 연결 임포트 (아래에서 설명)
const bcrypt = require('bcrypt'); // 비밀번호 해싱 라이브러리 (필요시)

const saltRounds = 10; // bcrypt 해싱에 사용할 라운드 수

/**
 * 사용자 중복 검사
 * @param {string} userID - 사용자의 ID
 * @returns {Promise<boolean>} - 중복 여부
 */
const checkDuplicateService = async (type, value) => {
  const query = type === "ID" ? 'SELECT * FROM `vellod`.`tb_member` WHERE `user_id` = ?' : 'SELECT * FROM `vellod`.`tb_member` WHERE `user_name` = ?';
  const params = [value];
  const [rows] = await db.query(query, params);
  return rows.length > 0;
}

/** * 사용자 등록
 * @param {Object} userData - 사용자 정보 객체
 * @param {string} userData.userID - 사용자의 ID
 * @param {string} userData.userPW - 사용자의 비밀번호  
 * @param {string} userData.userName - 사용자의 이름
 * @param {string} userData.userMail - 사용자의 이메일
 * @throws {Error} - 데이터베이스 쿼리 실패 시 에러
 * @return {Promise<void>} - 등록 성공 여부
 */ 
const registerUserService = async (userData) => {
  const { userID, userPW, userName, userMail } = userData;
  const hashedPassword = await bcrypt.hash(userPW, saltRounds);

  const query = `INSERT INTO \`vellod\`.\`tb_member\` (\`user_id\`, \`user_name\`, \`user_password\`, \`user_email\`)
                 VALUES (${userID}, ${userName}, ${hashedPassword}, ${userMail})`;

  await db.query(query, [userID, userName, hashedPassword, userMail]);
  console.log(`사용자 ${userID} 등록 성공`);
}
/** * 사용자 로그인
 * @param {string} userID - 사용자의 ID
 * @param {string} userPW - 사용자의 비밀번호
 * @returns {Promise<Object>} - 로그인 성공 시 사용자 정보 객체 
 * @throws {Error} - 로그인 실패 시 에러
 */
const loginUserService = async (userID, userPW) => {
  const [rows] = await db.query('SELECT * FROM `vellod`.`tb_member` WHERE `user_id` = ?', [userID]);
  
  if (rows.length === 0) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  
  const user = rows[0];
  
  const isPasswordValid = await bcrypt.compare(userPW, user.user_password);
  
  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  
  return { userID: user.user_id, userName: user.user_name };
}


const userService = {
  registerUserService,
  loginUserService,
  checkDuplicateService
}
module.exports = userService;