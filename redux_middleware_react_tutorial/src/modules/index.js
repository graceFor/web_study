import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import sample_saga, { sampleSaga } from "./sample_saga";
//import sample from "./sample";
import loading from "./loading";

const rootReducer = combineReducers({
  counter,
  sample_saga,
  loading,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 합쳐 주는 역할
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
