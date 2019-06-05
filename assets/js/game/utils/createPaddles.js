import Matter from 'matter-js'
import consts from '../consts'

const stopper = (x, y, side, position) => {
  // invisible bodies to constrict paddles
  // determine which paddle composite to interact with
  const attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp'

  return Matter.Bodies.circle(x, y, 40, {
    isStatic: true,
    render: {
      visible: false
    },
    collisionFilter: {
      group: window.stopperGroup
    },
    plugin: {
      attractors: [
        // stopper is always a, other body is b
        function (a, b) {
          if (b.label === attracteeLabel) {
            const isPaddleUp = (side === 'left') ? window.isLeftPaddleUp : window.isRightPaddleUp
            const isPullingUp = (position === 'up' && isPaddleUp)
            const isPullingDown = (position === 'down' && !isPaddleUp)
            if (isPullingUp || isPullingDown) {
              return {
                x: (a.position.x - b.position.x) * consts.PADDLE_PULL,
                y: (a.position.y - b.position.y) * consts.PADDLE_PULL
              }
            }
          }
        }
      ]
    }
  })
}

function setPaddleUp (evt) {
  const breakpoint = window.innerWidth / 2
  const clientX = evt.pageX || evt.touches[0].clientX

  clientX > breakpoint ? window.isRightPaddleUp = true : window.isLeftPaddleUp = true
}

function setPaddleDown (evt) {
  const breakpoint = window.innerWidth / 2
  const clientX = evt.pageX || evt.changedTouches[0].clientX

  clientX > breakpoint ? window.isRightPaddleUp = false : window.isLeftPaddleUp = false
}

const createPaddleEvents = () => {
  const el = document.querySelector('.game')
  el.addEventListener('touchstart', setPaddleUp, false)
  el.addEventListener('touchend', setPaddleDown, false)

  // keyboard paddle events
  document.body.addEventListener('keydown', function (e) {
    if (e.which === 37) { // left arrow key
      window.isLeftPaddleUp = true
    } else if (e.which === 39) { // right arrow key
      window.isRightPaddleUp = true
    }
  })

  document.body.addEventListener('keyup', function (e) {
    if (e.which === 37) { // left arrow key
      window.isLeftPaddleUp = false
    } else if (e.which === 39) { // right arrow key
      window.isRightPaddleUp = false
    }
  })
}

const createPaddles = () => {
  window.isLeftPaddleUp = false
  window.isRightPaddleUp = false

  createPaddleEvents()
  // these bodies keep paddle swings contained, but allow the ball to pass through
  const leftUpStopper = stopper(400, 1410, 'left', 'up')
  const leftDownStopper = stopper(330, 1610, 'left', 'down')
  const rightUpStopper = stopper(590, 1410, 'right', 'up')
  const rightDownStopper = stopper(655, 1610, 'right', 'down')
  Matter.World.add(window.engine.world, [leftUpStopper, leftDownStopper, rightUpStopper, rightDownStopper])

  // this group lets paddle pieces overlap each other
  const paddleGroup = Matter.Body.nextGroup(true)

  // Left paddle mechanism
  const paddleLeft = {}
  const xLeftPos = 308
  const yLeftPos = 1525

  const paddleLeftVertices = Matter.Vertices.fromPath(consts.PATHS.LEFT_FLIPPER_PADDLE)

  paddleLeft.paddle = Matter.Bodies.fromVertices(xLeftPos, yLeftPos, paddleLeftVertices, {
    label: 'paddleLeft',
    render: {
      fillStyle: consts.COLOR.PADDLE
    }
  })

  paddleLeft.brick = Matter.Bodies.rectangle(xLeftPos - 5, yLeftPos + 15, 80, 145, {
    angle: 2.2,
    chamfer: {},
    render: {
      visible: false
    }
  })

  // paddleLeft.cover = Matter.Bodies.rectangle(xLeftPos, yLeftPos + 20, 100, 45, {
  //   render: {
  //     visible: true,
  //     sprite: {
  //       texture: `/img/flipper-right.png`
  //     }
  //   }
  // })

  paddleLeft.comp = Matter.Body.create({
    label: 'paddleLeftComp',
    parts: [paddleLeft.paddle, paddleLeft.brick]
  })

  paddleLeft.hinge = Matter.Bodies.circle(xLeftPos + 25, yLeftPos - 25, 5, {
    isStatic: true,
    render: {
      visible: false
    }
  })

  Object.values(paddleLeft).forEach((piece) => {
    piece.collisionFilter.group = paddleGroup
  })

  paddleLeft.con = Matter.Constraint.create({
    bodyA: paddleLeft.comp,
    pointA: { x: -35, y: -35 },
    bodyB: paddleLeft.hinge,
    length: 0,
    stiffness: 0
  })

  Matter.World.add(window.engine.world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con])

  // right paddle mechanism
  const paddleRight = {}
  const xRightPos = 652
  const yRightPos = 1525

  const paddleRightVertices = Matter.Vertices.fromPath(consts.PATHS.RIGHT_FLIPPER_PADDLE)

  paddleRight.paddle = Matter.Bodies.fromVertices(xRightPos, yRightPos, paddleRightVertices, {
    label: 'paddleRight',
    render: {
      fillStyle: consts.COLOR.PADDLE
    }
  })

  paddleRight.brick = Matter.Bodies.rectangle(xRightPos, yRightPos + 15, 80, 145, {
    angle: -2.2,
    chamfer: {},
    render: {
      visible: false
    }
  })

  paddleRight.comp = Matter.Body.create({
    label: 'paddleRightComp',
    parts: [paddleRight.paddle, paddleRight.brick]
  })

  paddleRight.hinge = Matter.Bodies.circle(xRightPos, yRightPos - 25, 5, {
    isStatic: true,
    render: {
      visible: false
    }
  })

  Object.values(paddleRight).forEach((piece) => {
    piece.collisionFilter.group = paddleGroup
  })

  paddleRight.con = Matter.Constraint.create({
    bodyA: paddleRight.comp,
    pointA: { x: 35, y: -35 },
    bodyB: paddleRight.hinge,
    length: 0,
    stiffness: 0
  })

  Matter.World.add(window.engine.world, [paddleRight.comp, paddleRight.hinge, paddleRight.con])
}

export {
  createPaddles
}
