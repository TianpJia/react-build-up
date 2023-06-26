import React, { useRef, useEffect, useState } from "react";

interface IPostion {
  x: number;
  y: number;
}

interface CircleProps {
  radius: number;
  width: number;
  height: number;
}

const Circle: React.FC<CircleProps> = ({ radius, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: radius, y: radius });
  const draw = (mousePosition: IPostion) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.fillStyle = "red";
        context.arc(mousePosition.x, mousePosition.y, radius, 0, 2 * Math.PI);
        context.fill();
      }
    }
  };

  const drawFish = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // 画身体
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.quadraticCurveTo(200, 50, 300, 150);
    ctx.quadraticCurveTo(200, 250, 100, 150);
    ctx.fillStyle = "rgb(96, 178, 229)";
    ctx.fill();

    // 画腹部
    ctx.beginPath();
    ctx.moveTo(125, 150);
    ctx.quadraticCurveTo(200, 75, 275, 150);
    ctx.quadraticCurveTo(200, 225, 125, 150);
    ctx.fillStyle = "#fff";
    ctx.fill();

    // 画眼睛
    ctx.beginPath();
    ctx.arc(175, 120, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 画瞳孔
    ctx.beginPath();
    ctx.arc(175, 120, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    // 画嘴巴
    ctx.beginPath();
    ctx.moveTo(150, 180);
    ctx.quadraticCurveTo(175, 200, 200, 180);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // 画尾巴
    ctx.beginPath();
    ctx.moveTo(300, 150);
    ctx.quadraticCurveTo(350, 75, 400, 150);
    ctx.quadraticCurveTo(350, 225, 300, 150);
    ctx.fillStyle = "rgb(96, 178, 229)";
    ctx.fill();

    // 画鳍
    ctx.beginPath();
    ctx.moveTo(200, 100);
    ctx.quadraticCurveTo(175, 50, 150, 100);
    ctx.lineTo(125, 130);
    ctx.quadraticCurveTo(150, 110, 175, 120);
    ctx.quadraticCurveTo(200, 130, 200, 100);
    ctx.fillStyle = "rgb(96, 178, 229)";
    ctx.fill();
  };

  useEffect(() => {
    draw(mousePosition);
    drawFish();
  }, [radius, mousePosition]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        // 获取 Canvas 相对于视口的位置和大小
        const rect = canvasRef.current.getBoundingClientRect();

        // 计算鼠标在 Canvas 上的位置
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const MouseFallowCircle: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return <Circle radius={50} width={width} height={height} />;
};

export default MouseFallowCircle;
