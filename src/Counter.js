import React, { Component } from "react";

class Counter extends Component {
  state = {
    number: 0,
    fixedNumber: 0,
  };
  render() {
    const { number, fixedNumber } = this.state; // state롤 조화할 때는 this.state로 조화합니다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바귀지 않는 값: {fixedNumber}</h2>
        <button
          //onClick을 통해 버론이 클릭되었울 때 호출할 함수룰 지정합니다.
          onClick={() => {
            this.setState({ number: number + 1 }, () => {
              console.log("방금 setState가 호출됨");
              console.log(this.state);
            });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
