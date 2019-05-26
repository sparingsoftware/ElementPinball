import Matter from 'matter-js'
import consts from '../consts'

export default class Bumper {
	constructor (x, y) {
    this.body = Matter.Bodies.circle(x, y, 25, {
      label: 'bumper',
      isStatic: true,
      render: {
        // fillStyle: consts.COLOR.BUMPER
        sprite: {
          texture: './src/assets/images/rock.png',
          xScale: 0.02,
          yScale: 0.02
        }
      }
    });

    // for some reason, restitution is reset unless it's set after body creation
    this.body.restitution = consts.BUMPER_BOUNCE;

		Matter.World.add(window.engine.world, this.body)
	}
}