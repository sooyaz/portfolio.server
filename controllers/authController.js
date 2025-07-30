const redisClient = require('../config/redis');
const authService = require('../services/authServices');

const User = require('../models/user');
const Token = require('../models/token');

/** * 사용자 등록
 * @param {Object} req - 요청 객체
 * @param {Object} res - 응답 객체
 */
const signUp = async (req, res, next) => {
  try {
    const { userID, userPW, userName, userMail } = req.body;
    if (!userID || !userPW || !userName || !userMail) {
      console.log("여기서 빠지는거니11111")
      return res.status(400).send({ status: 400, message: '모든 필드를 입력해주세요.' });
    }
    
    const isVerificationPending = await redisClient.exists(`verification:${userMail}`);
    if (isVerificationPending) {
      console.log("여기서 빠지는거니22222")
      return res.status(400).send({ status: 400, message: '이메일 인증이 완료되지 않았습니다.' });
    }

    await authService.signUpService({ userID, userPW, userName, userMail });
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
const login = async (req, res) => {
  try {
    const { userID, userPW } = req.body;
    const user = await authService.loginService(userID, userPW);
console.log("dho", user)
    const accessToken = Token.generateAccessToken(user);
    const refreshToken = Token.generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      sameSite: 'Lax', // 또는 'Strict'
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true, // 클라이언트 JS에서 접근 불가 (보안 중요)
      secure: false,   // HTTPS에서만 동작
      sameSite: 'lax',
      maxAge: 1000 * 60 * 15, // 15분
    });
    // 액세스 토큰은 응답 본문에 담아 클라이언트에 전송
    res.status(200).send({ status: 200, message: '로그인 성공', data: user, accessToken });
    console.log(`사용자 ${userID} 로그인 성공`);


    // res.status(200).send({ status: 200, message: '로그인 성공', data: user });
    // console.log(`사용자 ${userID} 로그인 성공`);
    // 로그인 성공 시 Redis에 사용자 세션 저장 (예시)
    // await redisClient.set(`session:${userID}`, JSON.stringify(user));
  } catch (error) {
    console.error('Error in userController.loginUser:123', error.message);
    res.status(401).send({ status: 401, message: error.message });
  }
}

const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: '리프레시 토큰이 없습니다.' });
  }
  try {
    const user = await Token.verifyRefreshToken(refreshToken);
    // 리프레시 토큰이 유효하면 새로운 액세스 토큰 발급
    const newAccessToken = Token.generateAccessToken({ id: user.id, username: user.username });
    res.status(200).json({ accessToken: newAccessToken });
  }
  catch (error) {
    // 리프레시 토큰이 유효하지 않거나 만료된 경우
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
    return res.status(403).json({ message: '리프레시 토큰이 유효하지 않거나 만료되었습니다. 다시 로그인해주세요.' });
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
    const isDuplicate = await authService.checkDuplicateService(type, value);

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
  signUp,
  login,
  checkDuplicate
}
module.exports = userController;