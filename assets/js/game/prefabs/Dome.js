import Matter from 'matter-js'
import consts from '../consts'

export default class Path {
  constructor (x, y, path) {
    const vertices = Matter.Vertices.fromPath(path)
    this.body = Matter.Bodies.fromVertices(x, y, vertices, {
      isStatic: true,
      render: {
        fillStyle: consts.COLOR.PEACH,
        opacity: 0
      }
    })

    Matter.World.add(window.engine.world, this.body)
  }
}
