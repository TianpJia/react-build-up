import React, { useRef, useEffect } from "react";
import ResizableTable from "../resizeTable";

interface IProps {
  diameter: number;
}

const Circle3D: React.FC<IProps> = ({ diameter }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref}>3d</div>
    </>
  );
};

export default Circle3D;
