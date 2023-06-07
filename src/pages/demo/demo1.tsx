import React, { useCallback, useMemo, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  console.info("parent rerender");

  const calculateExpensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    let sum = 0;
    for (let i = 0; i < count * 10000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  const handleButtonClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handleTextChange = useCallback((event: any) => {
    setText(event.target.value);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {calculateExpensiveValue}</p>
      <button onClick={handleButtonClick}>Increment Count</button>
      <input type="text" value={text} onChange={handleTextChange} />
    </div>
  );
}

export default Example;
