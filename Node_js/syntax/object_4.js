var q = {
  v1: "v1",
  v2: "v2",
  f1: function () {
    console.log(this.v1);
  },
  f2: function () {
    console.log(this.v2);
  },
};

// f1 함수를 실행
q.f1(); // v1

// f2 함수를 실행
q.f2(); // v2
