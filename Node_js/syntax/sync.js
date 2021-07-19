// 동기

var fs = require("fs");

/* //readFileSync
console.log("A"); // A
var result = fs.readFileSync("sample.txt", "utf8");
console.log(result); // B
console.log("C"); // C
*/

console.log("A");
fs.readFile("sample.txt", "utf8", function (err, result) {
  // Sync 없이 => 비동기적으로 처리
  console.log(result); // callback
});
console.log("C");
