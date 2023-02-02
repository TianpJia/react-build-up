import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { DatePicker } from "antd";

const App = () => {
  return (
    <>
      <DatePicker></DatePicker>
    </>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
