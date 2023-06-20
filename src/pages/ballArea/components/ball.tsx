import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";

interface BallProps {
  radius: number; // 球体半径
  color: string; // 球体颜色
}
const g = 9.8; // 重力加速度
const Ball: React.FC<BallProps> = ({ radius, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef(0); // 初始高度
  const y = useRef(0); // 初始高度
  const vy = useRef(0); // 初始速度

  function draw() {
    cancelAnimationFrame(animationFrameId.current);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d")!;
    const fallBall = () => {
      if (!canvas) return;
      // 清空画布
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 计算下一时刻的位置和速度
      vy.current += g / 60; // 时间间隔为 1/60 秒
      y.current += vy.current;

      // 绘制球体
      context.beginPath();
      context.fillStyle = color;
      context.arc(canvas.width / 2, y.current + radius, radius, 0, Math.PI * 2);
      context.fill();
      if (y.current > canvas.height) {
        cancelAnimationFrame(animationFrameId.current);
        y.current = 0;
        draw();
      } else {
        requestAnimationFrame(draw);
      }
    };
    animationFrameId.current = requestAnimationFrame(fallBall);
  }

  useEffect(() => {
    draw();
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          cancelAnimationFrame(animationFrameId.current);
        }}
      >
        stop
      </Button>
      <canvas
        ref={canvasRef}
        width={"600px"}
        height={"700px"}
        onClick={() => {
          draw();
        }}
      />
    </div>
  );
};

export default Ball;
