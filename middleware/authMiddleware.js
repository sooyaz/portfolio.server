const Token = require('../models/Token');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ message: '인증 토큰이 제공되지 않았습니다.' });
    }

    try {
        const user = await Token.verifyAccessToken(accessToken);
        req.user = user; // 요청 객체에 사용자 페이로드 추가
        next();
    } catch (error) {
        // 토큰 만료 또는 유효하지 않은 경우
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '액세스 토큰이 만료되었습니다.', code: 'TOKEN_EXPIRED' });
        }
        return res.status(403).json({ message: '유효하지 않은 액세스 토큰입니다.' });
    }
};

module.exports = { authenticateToken };