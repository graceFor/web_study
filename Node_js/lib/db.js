var mysql = require("mysql2");

// mysql 서버에 접속하기 위한 setting
var db = mysql.createConnection({
  // host = 데이터베이스 서버가 어떤 컴퓨터에 있는지
  // localhost = node.js와 mysql 서버가 같은 컴퓨터에 있음
  host: "localhost",
  user: "root",
  password: "gustns50",
  database: "opentutorials",
});

//실제 접속
db.connect();

module.exports = db;
