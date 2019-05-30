import Matter from 'matter-js'
import consts from '../consts'

export default class Trapezoid {
	constructor (x, y, width, height, slope, angle = 0) {
		this.body = Matter.Bodies.trapezoid(x, y, width, height, slope, {
      isStatic: true,
      render: {
        fillStyle: consts.COLOR.PEACH
        // sprite: {
          // texture: './assets/rock.png',
          // xScale: 0.02,
          // yScale: 0.02
        // }
      }
		})

		Matter.Body.setAngle(this.body, angle)

		Matter.World.add(window.engine.world, this.body)
	}
}