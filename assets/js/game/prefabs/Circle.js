import Matter from 'matter-js'
import consts from '../consts'

export default class Circle {
  constructor (x, y, r) {
    this.body = Matter.Bodies.circle(x, y, r, {
      isStatic: true,
      render: {
        fillStyle: consts.COLOR.GRAY
      }
    })

    Matter.World.add(window.engine.world, this.body)
  }
}
