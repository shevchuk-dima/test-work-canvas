import Dot from "./Dot.jsx";
import AbstractFigure from "./AbstarctFigure.jsx";

export default class Line extends AbstractFigure{
  constructor(x, y, x1, y1) {
    super(x, y);
    this.x1 = x1;
    this.y1 = y1;
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x1, this.y1);
    context.stroke();
    context.closePath();
  }

  static isCross(line, lines) {
    let dots = [];
    if (lines.length > 0) {
      let Ua, Ub, numerator_a, numerator_b, denominator;
      let x1 = line.x;
      let y1 = line.y;
      let x2 = line.x1;
      let y2 = line.y1;
      let xCross = 0,
        yCross = 0;
      let x3, y3, x4, y4;
      lines.map((item) => {
        x3 = item.x;
        y3 = item.y;
        x4 = item.x1;
        y4 = item.y1;
        denominator = (y4 - y3) * (x1 - x2) - (x4 - x3) * (y1 - y2);
        numerator_a = (x4 - x2) * (y4 - y3) - (x4 - x3) * (y4 - y2);
        numerator_b = (x1 - x2) * (y4 - y2) - (x4 - x2) * (y1 - y2);
        Ua = numerator_a / denominator;
        Ub = numerator_b / denominator;
        if (Ua >= 0 && Ua <= 1 && Ub >= 0 && Ub <= 1) {
          xCross = x1 * Ua + x2 * (1 - Ua);
          yCross = y1 * Ua + y2 * (1 - Ua);
          dots.push(new Dot(xCross, yCross));
        } else {
          dots.push(new Dot(0, 0));
        }
      });
    }
    return dots;
  }

  static checkCrossDots(linesCurrent, dotsCross) {
    let dots = [];
    dotsCross.map((dot) => {
      linesCurrent.map((item) => {
        let arrX = [item.x, item.x1];
        let arrY = [item.y, item.y1];
        arrX.sort((a, b) => a - b);
        arrY.sort((a, b) => a - b);
        if (
          arrX[0] < dot.x &&
          arrX[1] > dot.x &&
          arrY[0] < dot.y &&
          arrY[1] > dot.y
        ) {
          dots.push(new Dot(dot.x, dot.y));
        }
      });
    });

    let unDistinct = [];
    let prev = [];

    dots.forEach((x) => {
      if (prev.length > 0) {
        if (prev[0] == x.x && prev[1] == x.y) {
          if (!unDistinct.length) {
            unDistinct.push(x);
            prev = [x.x, x.y];
          } else {
            if (
              prev[0] !== unDistinct[unDistinct.length - 1].x &&
              prev[1] !== unDistinct[unDistinct.length - 1].y
            ) {
              unDistinct.push(x);
              prev = [x.x, x.y];
            }
          }
        } else {
          prev = [x.x, x.y];
        }
      } else {
        prev = [x.x, x.y];
      }
    });

    return unDistinct;
  }
}
