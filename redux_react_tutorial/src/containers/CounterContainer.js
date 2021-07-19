import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

// useSelector, useDispatch 사용해서 간단하게
const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrese={onIncrease} onDecrease={onDecrease} />
  );
};

// export default connect(
//   (state) => ({
//     number: state.counter.number,
//   }),
//   { increase, decrease },
// )(CounterContainer);

export default CounterContainer;
