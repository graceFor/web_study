// 배열과 반복문의 활용

var number = [1, 400, 12, 34];
var i = 0;
var total = 0;
while (i < number.length) {
  // 배열의 총 합을 구하는 반복문
  total = total + number[i];
  i = i + 1;
}
console.log(`total : ${total}`);
