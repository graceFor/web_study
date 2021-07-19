//mysql 모듈을 사용하겠다
var mysql = require("mysql2");

// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다.
var connection = mysql.createConnection({
  // host = 데이터베이스 서버가 어떤 컴퓨터에 있는지
  // localhost = node.js와 mysql 서버가 같은 컴퓨터에 있음
  host: "localhost",
  user: "root",
  password: "gustns50",
  database: "opentutorials",
});

connection.connect(); // 접속이 될 것이다

// 접속이 끝난 후에 query(=SELECT * FROM topic)를 줘서 데이베이스 서버에 query가 전송되서 실행이 끝난 후에, callback이 실행
connection.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) {
    // error 났을 때 실행
    console.log(error);
  }
  console.log(results); // 결과 값
});

connection.end();
