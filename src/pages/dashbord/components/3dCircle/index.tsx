import React, { useRef, useState } from "react";
import styles from "./index.module.less";
import ReactEcharts from "echarts-for-react";
import { Emotion, getOption } from "./utils";

const BALL_SIZE = 20;

const Circle3D: React.FC<{}> = ({}) => {
  const [options, setOptions] = useState<any>(getOption());
  const [isSleep, setIsSleep] = useState(false);
  const [currenEemotion, setCurrentEmotion] = useState(Emotion.normol);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bigEyeRef = useRef<HTMLDivElement>(null);
  const eyeballRef = useRef<HTMLDivElement>(null);
  const filterbigEyeRef = useRef<HTMLDivElement>(null);
  const leftRotSize = useRef(0);
  const ballSize = useRef(12);
  const ballColor = useRef("#02ffff");
  const timer = useRef<NodeJS.Timeout>();

  const getEyeballChart = (rotSize: number, bSize: number) => {
    const option = {
      series: [
        {
          startAngle: `${0 + rotSize * 5}`, // 加为逆时针旋转，乘5表示速度为leftRotSize的倍
          endAngle: `${270 + rotSize * 5}`, // 即变为每10微秒移动0.5度，1234678同理
          // ...其他
          splitLine: {
            length: bSize, // 分割线高度设置为眼球尺寸变量
            lineStyle: {
              shadowColor: ballColor.current, // 把眼睛的眼影颜色设为变量控制
              color: ballColor.current,
            },
          },
        },
        {
          startAngle: `${45 + rotSize * 5}`,
          endAngle: `${315 + rotSize * 5}`,
          // ...其他
          splitLine: {
            length: bSize, // 同上
            lineStyle: {
              // ...其他
              shadowColor: ballColor.current,
              color: ballColor.current,
            },
          },
        },
      ],
    };
    setOptions(option);
  };

  const toFixedOne = (parm: number) => {
    return Number(parm.toFixed(1));
  };

  const toAngry = () => {
    setCurrentEmotion(Emotion.angry);
    ballColor.current = "rgb(255, 60, 86)";
  };

  const toNormal = () => {
    setCurrentEmotion(Emotion.normol);
    ballColor.current = "#02ffff";
  };

  function toSleep() {
    if (ballSize.current === 0) {
      setIsSleep(true);
      toNormal();
    }
    getEyeballChart(leftRotSize.current, ballSize.current);
    if (ballSize.current > 0) {
      setTimeout(() => {
        toSleep();
      }, 10);
      ballSize.current = toFixedOne(ballSize.current - 0.1); // 当眼球存在时慢慢减小
    }
    leftRotSize.current === 360
      ? (leftRotSize.current = 0)
      : (leftRotSize.current = toFixedOne(leftRotSize.current + 0.1)); // 旋转，
  }

  const weakUp = () => {
    clearTimeout(timer.current);
    if (ballSize.current === BALL_SIZE) {
      setIsSleep(false);
      toAngry();
    }
    getEyeballChart(leftRotSize.current, ballSize.current);
    if (ballSize.current <= BALL_SIZE) {
      ballSize.current = toFixedOne(ballSize.current + 0.1);
    }
    leftRotSize.current === 360
      ? (leftRotSize.current = 0)
      : (leftRotSize.current = toFixedOne(leftRotSize.current + 0.5)); // 旋转，
    timer.current = setTimeout(() => {
      weakUp();
    }, 10);
  };

  function focusOnMouse(e: any) {
    {
      // 视口尺寸，获取到整个视口的大小
      const container = bodyRef.current;
      const bigEye = bigEyeRef.current;
      const eyeball = eyeballRef.current;
      const filterbigEye = filterbigEyeRef.current;
      if (!container || !bigEye || !eyeball || !filterbigEye) return;
      let clientWidth = container.clientWidth;
      let clientHeight = container.clientHeight;
      // 原点，即bigEye中心位置，页面中心
      let origin = [clientWidth / 2, clientHeight / 2];
      // 鼠标坐标
      let mouseCoords = [e.clientX - origin[0], origin[1] - e.clientY];
      // 旋转角度
      let eyeXDeg = (mouseCoords[1] / clientHeight) * 120; // 这里的80代表的是最上下边缘大眼X轴旋转角度
      let eyeYDeg = (mouseCoords[0] / clientWidth) * 100;
      bigEye.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`;
      filterbigEye.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`;
      eyeball.style.transform = `translate(${eyeYDeg / 1.5}px, ${
        -eyeXDeg / 1.5
      }px)`;
    }
  }

  return (
    <div
      className={`${styles["container"]} ${styles[currenEemotion]}`}
      ref={bodyRef}
      onMouseMove={focusOnMouse}
    >
      <div
        className={`${styles["eyeSocket"]} ${
          isSleep ? styles["eyeSocketSleeping"] : styles["eyeSocketLooking"]
        }`}
        onClick={() => {
          if (isSleep) {
            weakUp();
          } else {
            clearTimeout(timer.current);
            toSleep();
          }
        }}
        ref={bigEyeRef}
      >
        <div id="eyeball" className={styles.eyeball} ref={eyeballRef}>
          <ReactEcharts option={options} style={{ height: 150 }}></ReactEcharts>
        </div>
      </div>
      <div className={styles.filter}>
        <div
          className={`${styles["eyeSocket"]} ${
            isSleep ? styles["eyeSocketSleeping"] : styles["eyeSocketLooking"]
          }`}
          id="eyeFilter"
          ref={filterbigEyeRef}
        ></div>
      </div>
      <svg width="0">
        <filter id="filter">
          <feTurbulence baseFrequency="1">
            <animate
              id="animate1"
              attributeName="baseFrequency"
              dur="1s"
              from="0.5"
              to="0.55"
              begin="0s;animate1.end"
            ></animate>
            <animate
              id="animate2"
              attributeName="baseFrequency"
              dur="1s"
              from="0.55"
              to="0.5"
              begin="animate2.end"
            ></animate>
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>
    </div>
  );
};

export default Circle3D;
