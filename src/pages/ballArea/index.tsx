import React from "react";
import Ball from "./components/ball";

const BallArea: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "80vh", backgroundColor: "gray" }}>
      <Ball radius={60} color="blue" />
    </div>
  );
};

export default BallArea;
