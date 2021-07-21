// // thunk 함수 사용 예제
// import { createAction, handleActions } from "redux-actions";

// // 액션 타입 정의하기
// const INCREASE = "counter/INCREASE";
// const DECREASE = "counter/DECREASE";

// // 액션 생성 함수 만들기
// export const increase = createAction(INCREASE);
// export const decrease = createAction(DECREASE);

// // 1초 뒤에 increase 혹은 decrease 함수를 디스패치 함 (thunk 함수 사용)
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

// // 초기상태
// const initialState = 0; // 상태는 꼭 객체일 필요 없음

// // 리듀서 함수 만들기
// const counter = handleActions(
//   {
//     [INCREASE]: (state) => state + 1,
//     [DECREASE]: (state) => state - 1,
//   },
//   initialState
// );

// export default counter;

// redux-saga 사용
import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select, throttle } from "redux-saga/effects";

// 액션 타입 정의하기
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

// 액션 생성 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// ()=> undefined를 두 번째 파라미터로 넣어 줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초틀 기다럽니다.
  yield put(increase()); // 특정 액션을 디스패치
  const number = yield select((state) => state.counter); // stated 상태를 의미함
  console.log(`현재 값은 ${number}입니다`);
}

function* decreaseSaga() {
  yield delay(1000); // 1초틀 기다럽니다.
  yield put(decrease()); // 특정 액션을 디스패치
}

export function* counterSaga() {
  // 첫번째 파라미터 : n초 *1000
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존에 진행 중이던 작업이 었다면 취소 처리하고
  // 가장 마자막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 초기상태
const initialState = 0; // 상태는 꼭 객체일 필요 없음

// 리듀서 함수 만들기
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
