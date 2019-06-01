import Matter from 'matter-js'
import consts from '../consts'

export default class Circle {
  constructor (x, y, r) {
    this.body = Matter.Bodies.circle(x, y, r, {
      label: 'bumper',
      isStatic: true,
      render: {
        fillStyle: consts.COLOR.GRAY
      }
    })

    // for some reason, restitution is reset unless it's set after body creation
    this.body.restitution = consts.BUMPER_BOUNCE

    Matter.World.add(window.engine.world, this.body)
  }
}
