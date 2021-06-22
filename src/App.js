import React from "react";
import "./App.css";

function App() {
  const name = "리액트";
  return (
    <>
      {/* 다은 이렇게 작성합니다. */}
      <div
        className="react" // 사작 태그를 여러 쿨로 작성하게 된다면 여기에 주석을 작성할 수 었습니다.
      >
        {name}
      </div>

      <input />
    </>
  );
}

export default App;
