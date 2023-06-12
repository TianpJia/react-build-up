//绘制圆弧或者圆使用arc()方法; arc(x, y, radius, startAngle, endAngle, anticlockwise) 默认为顺时针
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  diameter: number,
  percentage: number
) {
  //   const radius = diameter / 2 - 10;
  //   const lineWidth = 20;

  //   ctx.clearRect(0, 0, diameter, diameter);

  //   // 绘制背景圆
  //   ctx.beginPath();
  //   ctx.arc(diameter / 2, diameter / 2, radius, 0, Math.PI * 2);
  //   ctx.strokeStyle = "#eee";
  //   ctx.lineWidth = lineWidth;
  //   ctx.stroke();

  //   // 绘制进度圆
  //   ctx.beginPath();
  //   ctx.arc(
  //     diameter / 2,
  //     diameter / 2,
  //     radius,
  //     -Math.PI / 2,
  //     (-Math.PI / 2 + (percentage / 100) * Math.PI * 2) as number
  //   );
  //   ctx.strokeStyle = "#007bff";
  //   ctx.stroke();

  // 绘制百分比文字
  //   ctx.font = "bold 28px Arial";
  //   ctx.fillStyle = "#007bff";
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.fillText(`${percentage}%`, diameter / 2, diameter / 2);
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.beginPath();
      var x = 25 + j * 50; // x 坐标值
      var y = 25 + i * 50; // y 坐标值
      var radius = 20; // 圆弧半径
      var startAngle = 0; // 开始点
      var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
      var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}
