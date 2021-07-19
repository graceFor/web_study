import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 이 설정을 통해 문자열 맨 앞의 ?룰 생략
  });
  console.log(query);
  const showDetail = query.detail === "true"; // 쿼러의 파싱 결과 값은 문자열
  console.log(showDetail);
  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 러액트 라우터 기초를 설습해 보는 예제 프로젝트입니다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
};
export default About;
