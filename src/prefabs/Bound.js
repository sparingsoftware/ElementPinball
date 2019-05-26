import Matter from 'matter-js'
import consts from '../consts'

export default class Bound {
	constructor (x, y, width, height) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, {
			isStatic: true,
			render: {
				fillStyle: consts.COLOR.OUTER
			}
    })

		Matter.World.add(window.engine.world, this.body)
	}
}