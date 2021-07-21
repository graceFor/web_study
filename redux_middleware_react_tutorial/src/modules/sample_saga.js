import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import { takeLatest } from "redux-saga/effects";
// import { startLoading, finishLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga";

// 액션 타입 선언
// 한 요청당 세 개를 만들어야 함
const GET_POST = "sample_saga/GET_POST";
const GET_POST_SUCCESS = "sample_saga/GET_POST_SUCCESS";
//const GET_POST_FAILURE = "sample_saga/GET_POST_FAILURE";
const GET_USERS = "sample_saga/GET_USERS";
const GET_USERS_SUCCESS = "sample_saga/GET_USERS_SUCCESS";
//const GET_USERS_FAILURE = "sample_saga/6ET_USERS_FAILURE";

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); //로딩 시작
//   // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있음
//   try {
//     // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있음
//     // 첫 번쎄 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.pay-load)의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data,
//     });
//   } catch (e) {
//     // try/catch 문을 사용하여 에러도 잡을 수 있음
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_POST)); // 로딩 완료
// }

// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS));
//   try {
//     const users = yield call(api.getUsers);
//     yield put({ type: GET_USERS_SUCCESS, payload: users.data });
//   } catch (e) {
//     yield put({ type: GET_USERS_FAILURE, payload: e, error: true });
//   }
//   yield put(finishLoading(GET_USERS));
// }

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태를 선언
// 요청의 로딩 중 상태는 loading 객체에서 관리
const initialState = {
  post: null,
  users: null,
};

const sample_saga = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,

      post: action.payload,
    }),

    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,

      users: action.payload,
    }),
  },
  initialState
);

export default sample_saga;
