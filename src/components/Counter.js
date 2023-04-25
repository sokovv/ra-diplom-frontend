import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../slice/counter";

export const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <span>
      Количество:
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={handleDecrement}>
          -
        </button>
        <span className="btn btn-outline-primary">{counter}</span>
        <button className="btn btn-secondary" onClick={handleIncrement}>
          +
        </button>
      </span>
    </span>
  );
};

export default Counter;
