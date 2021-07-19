// callback

var a = function () {
  // a 함수 정의
  console.log("A");
};

a(); // A

// slovwfunc 기능의 실행이 끝난 후에, 이 함수 실행이 끝났으니까 다음 일을 하세요 => callback을 받아서 실행
function slowfunc(callback) {
  callback();
}

slowfunc(a); // showfunc 함수의 실행이 끝난 후에, a 함수를 실행하세요
// slowfunc() 실행 ->  a() 실행
// A
