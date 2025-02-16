import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const name = useSelector((state) => state.counter.name)
    const dispatch = useDispatch();
    console.log('count', count)
    console.log('name', name)
    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button

                onClick={() => {
                    dispatch(decrement())
                }}
            >
                -
            </button>
            <h1>
                Count:  {count}
            </h1>
            <button

                onClick={() => {
                    dispatch(increment())
                }}
            >
                +
            </button>
        </div>
    )
}
export default Counter;