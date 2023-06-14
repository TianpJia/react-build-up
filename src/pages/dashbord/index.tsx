import { Col, Row } from "antd";
import React from "react";
import BezierCurve from "./components/bezierCurve";
import Circle from "./components/circle";
import Rectangle from "./components/rectangle";

const Dashbord: React.FC = () => {
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <Circle diameter={200} percentage={75} />
        </Col>
      </Row>
      <Row> <Rectangle diameter={200} /></Row>
      <Row><BezierCurve diameter={200} /> </Row>
    </div>
  );
};

export default Dashbord;
