import React from "react";
import { withRouter } from "react-router-dom";
import WithRouterSample from "./WithRouterSample";

const data = {
  velopert: {
    name: "김현경",
    description: "백엔드 개발자",
  },
  gildong: {
    name: "홍길동",
    description: "주인공",
  },
};

const Profile = ({ match }) => {
  console.log(match);
  console.log(match.params); // ex) {username: "김현경"}
  console.log(match.params.username); // 김현경
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default withRouter(Profile);
