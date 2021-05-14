// Node.js의 기능 - 파일 목록 알아내기

var testFolder = "../data"; // 디렉토리 위치
var fs = require("fs");

fs.readdir(testFolder, function (error, filelist) {
  // 디렉토리 안에 위치한 파일 list 읽기
  console.log(filelist);
});
