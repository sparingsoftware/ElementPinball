import Matter from 'matter-js'

export default class Wall {
	constructor (x, y, width, height, color, angle = 0) {
		this.body = Matter.Bodies.rectangle(x, y, width, height, {
      angle: angle,
      isStatic: true,
      chamfer: { radius: 10 },
      render: {
        fillStyle: color
      }
    })

		Matter.World.add(window.engine.world, this.body)
	}
}