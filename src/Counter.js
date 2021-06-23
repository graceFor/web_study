import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    //state의 초것값 설정하기
    this.state = {
      number: 0,
      fixedNumber: 0,
    };
  }
  render() {
    const { number, fixedNumber } = this.state; // state롤 조화할 때는 this.state로 조화합니다.
    return (
      <div>
        <h1>{number}</h1>
        <h2>바귀지 않는 값: {fixedNumber}</h2>
        <button
          //onClick을 통해 버론이 클릭되었울 때 호출할 함수룰 지정합니다.
          onClick={() => {
            // this.setState틀 사용하여 state에 새로운 값울 넣울 수 있습니다.
            this.setState({ number: number + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
