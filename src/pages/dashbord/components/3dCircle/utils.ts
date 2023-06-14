export const getOption = () => {
  return {
    series: [
      {
        type: "gauge", // 使用仪表盘类型
        radius: "-20%", // 采用负数是为了让分割线从内向外延伸
        clockwise: false,
        startAngle: "0", // 起始角度
        endAngle: "270", // 结束角度
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
            shadowColor: "rgb(0, 238, 255)", // 阴影颜色
            shadowOffsetY: "0",
            color: "rgb(0, 238, 255)", // 分割线颜色
            width: 4, // 分割线宽度
          },
        },
        axisLabel: false,
      },
      {
        type: "gauge",
        radius: "-20%",
        clockwise: false,
        startAngle: "45", // 倾斜45度
        endAngle: "315",
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
            shadowColor: "rgb(0, 238, 255)",
            shadowOffsetY: "0",
            color: "rgb(0, 238, 255)",
            width: 4,
          },
        },
        axisLabel: false,
      },
    ],
  };
};

export enum Emotion {
  normol = "nomal",
  angry = "angry",
}
