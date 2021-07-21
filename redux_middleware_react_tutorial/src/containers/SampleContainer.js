import React from "react";
import { connect } from "react-redux";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample_saga";

const { useEffect } = React;
const SampleContainer = ({ getPost, getUsers, post, users, loadingPost, loadingUsers }) => {
  // // 클래스 형태 컴포넌트였다면 componentDidMount
  useEffect(() => {
    getPost(1); // 1은 id
    getUsers(1); // 1은 id
  }, [getPost, getUsers]);
  return <Sample post={post} users={users} loadingPost={loadingPost} loadingUsers={loadingUsers} />;
};

export default connect(
  ({ sample_saga, loading }) => ({
    post: sample_saga.post,
    users: sample_saga.users,
    loadingPost: loading["sample_saga/GET_POST"],
    loadingUsers: loading["samsample_sagaple/GET_USERS"],
  }),
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
