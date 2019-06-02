import Matter from 'matter-js'

export default class Reset {
  constructor (x, y, width) {
    this.body = Matter.Bodies.rectangle(x, y, width, 2, {
      label: 'reset',
      isStatic: true,
      render: {
        fillStyle: '#fff',
        opacity: 0
      }
    })

    Matter.World.add(window.engine.world, this.body)
  }
}
