import React, { useState } from 'react'
import { increment, decrement, incrementBy5, incrementByUserNumber } from "../redux/counterSlice";
import { useDispatch } from "react-redux";
function B() {
    const [number, setNumber] = useState(0)
    const dispatch = useDispatch();
    console.log('number', number)
    return (
        <div className='box' style={{ borderColor: "yellow" }}>
            <button

                onClick={() => {
                    dispatch(decrement())
                }}
            >
                -
            </button>

            B

            <button

                onClick={() => {
                    dispatch(increment())
                }}
            >
                +
            </button>
            <br />
            <input type="number" width={"10px"} value={number} onChange={(e) => setNumber(e.target.value)} />
            <button

                onClick={() => {
                    dispatch(incrementBy5())
                }}
            >
                +5
            </button>
            <button

                onClick={() => {
                    dispatch(incrementByUserNumber(parseInt(number)))
                }}
            >
                +{number}
            </button>
        </div>
    )
}

export default B