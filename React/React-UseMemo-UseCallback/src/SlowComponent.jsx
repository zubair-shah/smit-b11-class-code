import { memo } from "react";

export const SlowComponent = memo(({ handleClick, value }) => {

    // Intentially making the component slow
    for (let i = 0; i < 1000000000; i++) { }
    console.log(handleClick)
    console.log("hello 2")
    return (
        <div>
            <h1>Slow Component</h1>
            <button onClick={handleClick}>Click Me</button>

        </div>
    );
});