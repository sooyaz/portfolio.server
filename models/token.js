const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

class Token {
    static generateAccessToken(userPayload) {
        // 사용자 ID와 username만 포함하여 페이로드 생성 (민감 정보 제외)
        return jwt.sign({ userID: userPayload.userID, userName: userPayload.userName }, ACCESS_SECRET, { expiresIn: '15m' });
    }

    static generateRefreshToken(userPayload) {
        return jwt.sign({ userID: userPayload.userID, userName: userPayload.userName }, REFRESH_SECRET, { expiresIn: '7d' });
    }

    static verifyAccessToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, ACCESS_SECRET, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });
    }

    static verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, REFRESH_SECRET, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });
    }
}

module.exports = Token;