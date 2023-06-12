import React, { useRef, useEffect } from "react";
import { drawCircle } from "../utils";

interface CircleProps {
  diameter: number;
  percentage: number;
}

const Circle: React.FC<CircleProps> = ({ diameter, percentage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 绘制圆环
    drawCircle(ctx, diameter, percentage);
  }, [canvasRef, diameter, percentage]);

  return <canvas ref={canvasRef} width={diameter} height={diameter} />;
};

export default Circle;
