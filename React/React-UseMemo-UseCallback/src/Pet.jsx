import { useState, useMemo } from "react";
function calculate() {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return result;
}
const Pet = () => {
  const [count, setCount] = useState(0)
  let expansiveNumber = useMemo(calculate, []);
  console.log("expansive Number", expansiveNumber)
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <h1>Hello React</h1>

      <h2>I am zubair</h2>
      <h3>React is fun</h3>
      <button onClick={handleClick}>Increase</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default Pet;
