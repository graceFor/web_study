// 함수의 입력

// 자바스크립트의 내장하고 있는 객체 Math와 round 함수(반올림해주는 함수)를 사용하기
// round에 입력값을 집어넣어 함수 사용
console.log(Math.round(1.6)); //2
console.log(Math.round(1.4)); //1

function sum(first, second) {
  // first, second 두개의 입력값을 받음
  // parameter
  console.log(first + second);
}

sum(2, 4); // argument // 6
