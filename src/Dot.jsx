import AbstarctFigure from "./AbstarctFigure.jsx"

export default class Dot extends AbstarctFigure {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
  };

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
    context.closePath();
  };
}
