import React, { useEffect, useRef, useState } from "react";
import Ball from "./components/ball";
import MouseFallowCircle from "./components/mouseFallowCircle";

const BallArea: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
  }, [ref.current?.offsetWidth]);
  return (
    <div
      style={{ width: "100%", height: "80vh", backgroundColor: "#4ca5d2" }}
      ref={ref}
    >
      {/* <Ball radius={60} color="blue" /> */}
      <MouseFallowCircle width={width} height={height} />
    </div>
  );
};

export default BallArea;
