const redisClient = require('../config/redis');
const userService = require('../services/userServices');


/** * 사용자 등록
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 */
const registerUser = async (req, res, next) => {
  try {
    const { userID, userPW, userName, userMail } = req.body;
    if (!userID || !userPW || !userName || !userMail) {
      return res.status(400).send({ status: 400, message: '모든 필드를 입력해주세요.' });
    }
    
    const isVerificationPending = await redisClient.exists(`verification:${userMail}`);
    if (isVerificationPending) {
      return res.status(400).send({ status: 400, message: '이메일 인증이 완료되지 않았습니다.' });
    }

    await userService.registerUserService({ userID, userPW, userName, userMail });
    res.status(201).send({ status: 201, message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('Error in userController.registerUser:', error);
    res.status(500).send({ status: 500, message: 'Internal Server Error' });
  }
}

/** * 사용자 로그인
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 * @returns {Promise<void>}
 * @throws {Error} - 로그인 실패 시 에러
 * */
const loginUser = async (req, res) => {
  try {
    const { userID, userPW } = req.body;
    const user = await userService.loginUserService(userID, userPW);

    const accessToken = genera




    res.status(200).send({ status: 200, message: '로그인 성공', data: user });
    console.log(`사용자 ${userID} 로그인 성공`);
    // 로그인 성공 시 Redis에 사용자 세션 저장 (예시)
    // await redisClient.set(`session:${userID}`, JSON.stringify(user));
  } catch (error) {
    console.error('Error in userController.loginUser:', error);
    res.status(401).send({ status: 401, message: error.message });
  }
}

/** * 사용자 중복 검사
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 * @returns {Promise<void>}
 */
const checkDuplicate = async (req, res) => {
  try {
    const { type, value } = req.body;
    const isDuplicate = await userService.checkDuplicateService(type, value);

    if (isDuplicate) {
      return res.status(409).send({ status: 409, message: '이미 사용 중인 ID 입니다.' });
    }
    
    return res.status(200).send({ status: 200, message: '사용 가능한 ID 입니다.' });
  } catch (error) {
    console.error('Error in userController.checkDuplicateID:', error);
    res.status(500).send({ status: 500, message: 'Internal Server Error' });
  }
}

const userController = {
  registerUser,
  loginUser,
  checkDuplicate
}
module.exports = userController;