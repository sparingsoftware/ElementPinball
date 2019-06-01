import Matter from 'matter-js'

export default class Reset {
  constructor (x, width) {
    this.body = Matter.Bodies.rectangle(x, 1800, width, 2, {
      label: 'reset',
      isStatic: true,
      render: {
        fillStyle: '#fff'
      }
    })

    Matter.World.add(window.engine.world, this.body)
  }
}
