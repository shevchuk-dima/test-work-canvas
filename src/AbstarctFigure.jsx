export default class AbstractFigure {
  constructor(x, y) {
    if (this.constructor.name === 'Animal') {
        throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
    }
    this.x = x;
    this.y = y;
}
  
  draw() {
    throw new Error("You have to implement the method draw!");
  }
}

