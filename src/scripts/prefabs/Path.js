import Matter from 'matter-js'
import consts from '../consts'

export default class Path {
	constructor (x, y, path) {
    let vertices = Matter.Vertices.fromPath(path)
		this.body = Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
			render: {
				fillStyle: consts.COLOR.PEACH,
				// add stroke and line width to fill in slight gaps between fragments
				strokeStyle: consts.COLOR.PEACH,
				lineWidth: 1
			}
		})

		// Matter.Body.setPosition(this.body, {x: x, y: y})

		Matter.World.add(window.engine.world, this.body)
	}
}