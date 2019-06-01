// global.decomp = require('poly-decomp')
import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import consts from './scripts/consts'
import { createStaticBodies } from './scripts/utils/createStaticBodies'
import { createPaddles } from './scripts/utils/createPaddles'
import { customRand } from './scripts/utils/utils'
// import Paddles from './scripts/prefabs/Paddles'

const loadGame = () => {
  // plugins
  Matter.use(MatterAttractors)

  // score elements
  const $currentScore = document.querySelector('.current-score span')
  const $highScore = document.querySelector('.high-score span')

  // shared variables
  let currentScore, highScore
  let engine, world, render, pinball
  let isPinballBlocked
  let lives = 3

  init()
  createStaticBodies()
  createPaddles()
  createPinball()
  createEvents()

  function init () {
    // engine (shared)
    window.engine = engine = Matter.Engine.create()

    // world (shared)
    world = engine.world
    world.bounds = {
      min: { x: 0, y: 0 },
      max: { x: 1080, y: 1920 }
    }
    world.gravity.y = consts.GRAVITY // simulate rolling on a slanted table

    // render (shared)
    render = Matter.Render.create({
      element: document.querySelector('.game-container'),
      engine: engine,
      options: {
        width: world.bounds.max.x,
        height: world.bounds.max.y,
        wireframes: consts.WIREFRAMES,
        // background: '/tmp/_tmp_plansza.png'
        background: 'transparent'
        // showDebug: false,
        // showBounds: true,
        // showPositions: true
      }
    })
    Matter.Render.run(render)

    // runner
    const runner = Matter.Runner.create()
    Matter.Runner.run(runner, engine)

    // used for collision filtering on various bodies
    window.stopperGroup = Matter.Body.nextGroup(true)

    // starting values
    currentScore = 0
    highScore = 0
    isPinballBlocked = true
  }

  function createPinball () {
    // x/y are set to when pinball is launched
    pinball = Matter.Bodies.circle(0, 0, 20, {
      label: 'pinball',
      collisionFilter: {
        group: window.stopperGroup
      },
      render: {
        sprite: {
          texture: '/img/ball.png'
        }
      }
    })
    Matter.World.add(world, pinball)
    dockPinball()
  }

  function gameOver () {
    console.log('game over')
  }

  function manageLives () {
    lives ? lives-- : gameOver()
  }

  function createEvents () {
    // events for when the pinball hits stuff
    Matter.Events.on(engine, 'collisionStart', function (event) {
      const pairs = event.pairs
      pairs.forEach(function (pair) {
        if (pair.bodyB.label === 'pinball') {
          switch (pair.bodyA.label) {
            case 'reset':
              manageLives()
              dockPinball()
              break
            case 'bumper':
              pingBumper(pair.bodyA)
              break
          }
        }
      })
    })

    // regulate pinball
    Matter.Events.on(engine, 'beforeUpdate', function (event) {
      // bumpers can quickly multiply velocity, so keep that in check
      Matter.Body.setVelocity(pinball, {
        x: Math.max(Math.min(pinball.velocity.x, consts.MAX_VELOCITY), -consts.MAX_VELOCITY),
        y: Math.max(Math.min(pinball.velocity.y, consts.MAX_VELOCITY), -consts.MAX_VELOCITY)
      })

      // cheap way to keep ball from going back down the shooter lane
      // if (pinball.position.x > 450 && pinball.velocity.y > 0) {
      //   Matter.Body.setVelocity(pinball, { x: 0, y: -10 })
      // }
    })

    // mouse drag (god mode for grabbing pinball)
    Matter.World.add(world, Matter.MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(render.canvas),
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    }))

    document.body.addEventListener('keyup', function (e) {
      if (e.which === 13 && isPinballBlocked) { // left arrow key
        launchPinball()
        isPinballBlocked = false
      }
    })
  }

  function dockPinball () {
    updateScore(0)
    isPinballBlocked = true
    Matter.Body.setPosition(pinball, { x: 580, y: 850 })
    // Matter.Body.setPosition(pinball, { x: 975, y: 1750 })
  }

  function launchPinball () {
    Matter.Body.setPosition(pinball, { x: 780, y: 850 })
    // Matter.Body.setPosition(pinball, { x: 975, y: 1750 })
    Matter.Body.setVelocity(pinball, { x: 0, y: -25 + customRand(-2, 2) })
    Matter.Body.setAngularVelocity(pinball, 0)
  }

  function pingBumper (bumper) {
    updateScore(currentScore + 10)

    // flash color
    bumper.render.fillStyle = consts.COLOR.BUMPER_LIT
    setTimeout(function () {
      bumper.render.fillStyle = consts.COLOR.BUMPER
    }, 100)
  }

  function updateScore (newCurrentScore) {
    currentScore = newCurrentScore
    $currentScore.innerHTML = currentScore

    highScore = Math.max(currentScore, highScore)
    $highScore.innerHTML = highScore
  }
}

export { loadGame }
