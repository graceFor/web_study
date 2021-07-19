// 파일 읽기

var fs = require("fs"); // node 모듈 중에 fs(파일시스템 다룰 수 있음)를 요구

//설명서 보고 따라해보기
fs.readFile("sample.txt", "utf8", function (err, data) {
  console.log(data);
});
