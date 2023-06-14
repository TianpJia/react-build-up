import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.less";
import ReactEcharts from "echarts-for-react";
import { Emotion, getOption } from "./utils";

const BALL_SIZE = 20;

const Circle3D: React.FC<{}> = ({}) => {
  const eyeballRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<any>(getOption());
  const [isSleep, setIsSleep] = useState(false);
  const [currenEemotion, setCurrentEmotion] = useState(Emotion.normol);
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

  function toSleep() {
    if (ballSize.current === 0) {
      setIsSleep(true);
      setCurrentEmotion(Emotion.normol);
      ballColor.current = "#02ffff";
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
      setCurrentEmotion(Emotion.angry);
      ballColor.current = "rgb(255, 60, 86)";
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

  useEffect(() => {
    setTimeout(() => {
      toSleep();
    }, 1000);
  }, []);

  return (
    <div className={`${styles["container"]} ${styles[currenEemotion]}`}>
      <div
        className={`${styles["eyeSocket"]} ${
          ballSize.current <= 0 ? styles["eyeSocketSleeping"] : ""
        }`}
        onClick={() => {
          if (isSleep) {
            weakUp();
          } else {
            clearTimeout(timer.current);
            toSleep();
          }
        }}
      >
        <div id="eyeball" className={styles.eyeball} ref={eyeballRef}>
          <ReactEcharts option={options} style={{ height: 150 }}></ReactEcharts>
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles["eyeSocket"]} id="eyeFilter"></div>
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
