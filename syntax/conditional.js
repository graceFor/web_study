// 조건문

var args = process.argv;
console.log(args[2]); // 콘솔에서 입력 값은 args[2]부터!
console.log("A");
console.log("B");
if (args[2] === "1") {
  // 콘솔에서의 입력값이 1이면 C1 출력
  console.log("C1");
} else {
  console.log("C2");
}
console.log("D");
