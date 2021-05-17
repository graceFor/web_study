//객체 - 값으로서의 함수

var f = function () {
  console.log(1 + 1);
  console.log(1 + 2);
};
var a = [f];
a[0](); // f 함수를 실행해라
// 2
// 3

var o = {
  func: f,
};

o.func(); // f 함수 실행
// 2
// 3
