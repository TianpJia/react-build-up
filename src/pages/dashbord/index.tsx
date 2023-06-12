import { Row } from "antd";
import React from "react";
import Circle from "./components/circle";
import Rectangle from "./components/rectangle";

const Dashbord: React.FC = () => {
  return (
    <div>
      <Row>
        <Circle diameter={200} percentage={75} />
      </Row>
      <Row>
        <Rectangle diameter={200} />
      </Row>
    </div>
  );
};

export default Dashbord;
