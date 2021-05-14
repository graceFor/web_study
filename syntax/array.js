// Data Type => array

var arr = ["A", "B", "C", "D"]; // 배열 선언
console.log(arr[1]); // B
console.log(arr[3]); // D
arr[2] = 3;
console.log(arr); // [ 'A', 'B', 3, 'D' ]
console.log(arr.length); // 4
arr.push("E");
console.log(arr); // [ 'A', 'B', 3, 'D', 'E' ]
