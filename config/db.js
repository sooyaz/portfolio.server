const mysql = require('mysql2/promise');
console.log("!!!왜 없어 !!!", process.env.DB_HOST);
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'qkqndi12',
  database: process.env.DB_NAME || 'study'
}

const db = mysql.createPool(dbConfig);

//테스트 연결
db.getConnection()
  .then(connection => {
    console.log(`${dbConfig.host} MySQL 데이터베이스에 성공적으로 연결되었습니다.`);
    connection.release(); // 연결 해제
  })
  .catch(err => {
    console.error(`${dbConfig.database} MySQL 데이터베이스 연결 실패:`, err.stack);
    process.exit(1); // 연결 실패 시 프로세스 종료
  });

module.exports = db;