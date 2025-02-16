import React from 'react'
import { useSelector } from "react-redux";
function A() {
    const count = useSelector((state) => state.counter.value)
    return (
        <div className='box'>A
            <h6>
                Count:  {count}
            </h6>
        </div>

    )
}

export default A