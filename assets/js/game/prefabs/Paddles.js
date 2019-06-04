import Matter from 'matter-js'

export default class Paddles {
  constructor () {
    this.isLeftPaddleUp = false;
    this.isRightPaddleUp = false;
    this.paddleGroup = Matter.Body.nextGroup(true)
  }
}
