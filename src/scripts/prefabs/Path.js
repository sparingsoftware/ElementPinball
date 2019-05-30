import Matter from 'matter-js'
import consts from '../consts'

export default class Path {
	constructor (x, y, path) {
    let vertices = Matter.Vertices.fromPath(path)
		this.body = Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
      render: {
        fillStyle: consts.COLOR.PEACH
      }
		})

		Matter.World.add(window.engine.world, this.body)
	}
}