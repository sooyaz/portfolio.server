const users = [
    { id: 'user_1', username: 'user1', password: 'password123', email: 'user1@example.com' },
    { id: 'admin_1', username: 'admin', password: 'adminpassword', email: 'admin@example.com' }
];

class User {
    static findByUsername(username) {
        return users.find(user => user.username === username);
    }

    // 실제로는 비밀번호 해싱 및 비교 로직이 여기에 포함됩니다.
    static verifyPassword(plainPassword, hashedPassword) {
        // 실제: bcrypt.compare(plainPassword, hashedPassword)
        return plainPassword === hashedPassword; // 더미 비교
    }

    // static findById(id) { ... } // ID로 사용자 찾는 함수 등
}

module.exports = User;