import Matter from 'matter-js'
import consts from '../consts'

export default class Rectangle {
  constructor (x, y, width, height, angle = 0, chamfer = 10) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
      angle: 0,
      isStatic: true,
      chamfer: { radius: chamfer },
      render: {
        fillStyle: consts.COLOR.GREEN
      }
    })

    Matter.Body.setAngle(this.body, angle)

    Matter.World.add(window.engine.world, this.body)
  }
}
