import React, { useEffect, useRef, useState } from "react";
import styles from './index.module.less'
import ReactEcharts from 'echarts-for-react';

const getOption = () => {
  return {
    series: [
      {
        type: 'gauge', // 使用仪表盘类型
        radius: '-20%', // 采用负数是为了让分割线从内向外延伸
        clockwise: false,
        startAngle: '0', // 起始角度
        endAngle: '270', // 结束角度
        splitNumber: 3, // 分割数量，会将270度分割为3份，所以有四根线
        detail: false,
        axisLine: {
          show: false,
        },
        axisTick: false,
        splitLine: {
          show: true,
          length: 12, // 分割线长度
          lineStyle: {
            shadowBlur: 20, // 阴影渐变
            shadowColor: 'rgb(0, 238, 255)', // 阴影颜色
            shadowOffsetY: '0',
            color: 'rgb(0, 238, 255)', // 分割线颜色
            width: 4, // 分割线宽度
          }
        },
        axisLabel: false
      },
      {
        type: 'gauge',
        radius: '-20%',
        clockwise: false,
        startAngle: '45', // 倾斜45度
        endAngle: '315',
        splitNumber: 3,
        detail: false,
        axisLine: {
          show: false,
        },
        axisTick: false,
        splitLine: {
          show: true,
          length: 12,
          lineStyle: {
            shadowBlur: 20,
            shadowColor: 'rgb(0, 238, 255)',
            shadowOffsetY: '0',
            color: 'rgb(0, 238, 255)',
            width: 4,
          }
        },
        axisLabel: false
      }
    ]
  }
}


const Circle3D: React.FC<{}> = ({ }) => {
  const eyeballRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<any>(getOption());
  const leftRotSize = useRef(0);
  const ballSize = useRef(12)

  const getEyeballChart = (rotSize: number, bSize: number) => {
    console.info(rotSize, bSize)
    const option = {
      series: [
        {
          startAngle: `${0 + rotSize * 5}`, // 加为逆时针旋转，乘5表示速度为leftRotSize的倍
          endAngle: `${270 + rotSize * 5}`, // 即变为每10微秒移动0.5度，1234678同理
          // ...其他
          splitLine: {
            length: bSize, // 分割线高度设置为眼球尺寸变量
          },
        },
        {
          startAngle: `${45 + rotSize * 5}`,
          endAngle: `${315 + rotSize * 5}`,
          // ...其他
          splitLine: {
            length: bSize, // 同上
          }
        },

      ]
    }
    setOptions(option)
  }

  const toFixedOne = (parm: number) => {
    return Number(parm.toFixed(1))
  }

  function toSleep() {
    getEyeballChart(leftRotSize.current, ballSize.current)
    if (ballSize.current > 0) {
      ballSize.current = toFixedOne(ballSize.current - 0.1) // 当眼球存在时慢慢减小
    }
    leftRotSize.current === 360 ? (leftRotSize.current = 0) : leftRotSize.current = toFixedOne(leftRotSize.current + 0.1); // 旋转，
    if (ballSize.current > 0) {
      setTimeout(() => {
        toSleep()
      }, 10);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      toSleep()
    }, 1000);
  }, [])

  return (
    <div className={styles['container']}>
      <div className={`${styles['eyeSocket']} ${ballSize.current <= 0 ? styles['eyeSocketSleeping'] : ''}`}>
        <div id="eyeball" className={styles.eyeball} ref={eyeballRef}>
          <ReactEcharts option={options} style={{ height: 150 }}></ReactEcharts>
        </div>

      </div>
    </div>
  );
};

export default Circle3D;
