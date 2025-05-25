import { useState, useCallback } from 'react';
import { SlowComponent } from './SlowComponent'

export const ExampleCallBack = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");

    const handleClick = useCallback(() => {
        setValue("Kunal");
    }, [value])
    // const handleClick = () => {
    //     setValue("Kunal");
    // }
    console.log("Running")
    return (
        <div className="App">
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
            <p>Count: {count}</p>
            <p>Value: {value}</p>
            <SlowComponent handleClick={handleClick} />
        </div>
    );
};

