import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashbord from "../../../pages/dashbord";
import Example from "../../../pages/demo/demo1";
import Statistics from "../../../pages/statistics";

const MyContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/home" element={<Example />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/dashbord" element={<Dashbord />} />
    </Routes>
  );
};

export default MyContent;
