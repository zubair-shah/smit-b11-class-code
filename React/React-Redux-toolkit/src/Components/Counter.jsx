import { useSelector } from "react-redux"
import { selectCount } from '../redux/counterSlice'
const Counter = () => {
    const number = useSelector((state) => state.counter.value)

    let count = 0;
    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button

                onClick={() => {

                }}
            >
                -
            </button>
            <h1>
                Count:  {count}
            </h1>
            <button

                onClick={() => {

                }}
            >
                +
            </button>
        </div>
    )
}
export default Counter;