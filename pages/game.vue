<template>
  <section class="scene">
    <div class="images-wrapper">
      <img class="image image--worm-black" src="/img/worm-black.png">
      <img class="image image--worm-black-second" src="/img/worm-black.png">
      <img class="image image--curl" src="/img/curl.png">
      <img class="image image--star" src="/img/star.png">
      <img class="image image--marshmallow" src="/img/marshmallow.png">
    </div>
    <div class="score current-score">
      score
      <span class="score--value">
        {{ score }}
      </span>
    </div>
    <div class="score high-score">
      high score
      <span class="score--value">
        {{ highScore }}
      </span>
    </div>
    <div class="lives">
      <img class="life" src="/img/life.png" alt="">
      <img class="life" src="/img/life.png" alt="">
      <img class="life" src="/img/life.png" alt="">
    </div>
    <div ref="gameContainer" class="game-container">
      <runway class="runway"/>
      <img class="image image--half-pipe" src="/img/half-pipe.png">
    </div>
  </section>
</template>

<script>
import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import consts from '@/assets/js/game/consts'
import { createStaticBodies } from '@/assets/js/game/utils/createStaticBodies'
import { createPaddles } from '@/assets/js/game/utils/createPaddles'
import { customRand } from '@/assets/js/game/utils/utils'
import runway from '@/components/Runway'

export default {
  components: {
    runway
  },
  head () {
    return {
      bodyAttrs: {
        class: 'game'
      }
    }
  },
  data () {
    return {
      score: 0,
      isPinballBlocked: true,
      lives: 2
    }
  },
  computed: {
    highScore () {
      return this.rank.ranking[0] ? this.rank.ranking[0].score : 0
    }
  },
  async asyncData ({ params, error, app }) {
    return {
      rank: await app.$service.rank.all()
    }
  },
  mounted () {
    if (process.browser) {
      setTimeout(() => {
        this.loadGame()
      }, 100)
    }
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      const { gameContainer } = this.$refs
      const windowHeight = window.innerHeight
      const scale = windowHeight / 1920
      gameContainer.style.webkitTransform = `scale(${scale})`
      gameContainer.style.transform = `scale(${scale})`
    },
    loadGame () {
      // plugins
      Matter.use(MatterAttractors)

      // score elements
      const bounceSound = new Audio('/sounds/bounce.mp3')
      const gameOverSound = new Audio('/sounds/game_over.mp3')
      const game = this

      // shared variables
      let engine, world, render, pinball

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
      }

      function createPinball () {
        // x/y are set to when pinball is launched
        pinball = Matter.Bodies.circle(0, 0, 20, {
          label: 'pinball',
          restitution: 0.5,
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
        gameOverSound.play()
        game.$store.commit('setCurrentScore', game.score)
        setTimeout(() => {
          if (process.browser) {
            window.localStorage.getItem('userName') ? game.$router.push('/rank') : game.$router.push('/score')
          }
        }, 200)
      }

      function takeLife () {
        gameOverSound.play()
        const livesElements = document.querySelectorAll('.lives .life')
        game.lives--
        livesElements[game.lives + 1].classList.add('life--disabled')
      }

      function manageLives () {
        game.lives ? takeLife() : gameOver()
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
          if (pinball.position.x > 977 && pinball.velocity.y > 0) {
            Matter.Body.setVelocity(pinball, { x: 0, y: -15 })
          }
        })

        const el = document.querySelector('.game')
        el.addEventListener('touchend', function (e) {
          if (game.isPinballBlocked) {
            launchPinball()
            game.isPinballBlocked = false
          }
        }, false)

        document.body.addEventListener('keyup', function (e) {
          if (e.which === 13 && game.isPinballBlocked) {
            launchPinball()
            game.isPinballBlocked = false
          }

          if (e.which === 32) {
            launchGodMode()
          }
        })
      }

      function dockPinball () {
        game.isPinballBlocked = true
        Matter.Body.setPosition(pinball, { x: 977, y: 1800 })
        pinball.isStatic = true
      }

      function launchPinball () {
        pinball.isStatic = false
        Matter.Body.setPosition(pinball, { x: 977, y: 1800 })
        Matter.Body.setVelocity(pinball, { x: 0, y: -45 + customRand(-2, 2) })
        Matter.Body.setAngularVelocity(pinball, 0)
      }

      function launchGodMode () {
        Matter.Body.setVelocity(pinball, { x: 0, y: -10 })
        Matter.Body.setAngularVelocity(pinball, 0)
      }

      function pingBumper (bumper) {
        bounceSound.play()

        game.score += 10

        // flash color
        bumper.render.opacity = 0.7
        setTimeout(() => {
          bumper.render.opacity = 1
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.game-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: 46% 146%;
  background-image: url('/img/board-bg-all.png');
}

.score {
  position: absolute;
  top: 45px;
  color: $peach;
  font-size: 1.1vh;
  display: flex;
  flex-direction: column;

  &--value {
    font-size: 6.15vh;
  }

  @include media-down (md) {
    top: 15px;
  }
}

.current-score {
  left: 35px;

  @include media-down (md) {
    left: 15px;
  }
}

.high-score {
  text-align: right;
  right: 35px;

  @include media-down (md) {
    right: 15px;
  }
}

.lives {
  position: absolute;
  bottom: 45px;
  left: 35px;
  z-index: 2;

  @include media-down (md) {
    bottom: 20px;
    left: 10px;
    display: flex;
    flex-direction: column;
  }

  .life {
    max-width: 50px;
    margin-right: 5px;

    @include media-down (md) {
      max-width: 27px;
      margin-bottom: 5px;
      margin-right: 0;
    }

    &--disabled {
      opacity: 0.8;
      filter: grayscale(100%);
    }
  }
}

.image {
  position: absolute;
  max-width: none;
  pointer-events: none;

  &--curl {
    height: 23.6vh;
    top: 0%;
    left: 50%;
    transform: translate(-139%, 14%);
    z-index: -1;
  }

  &--half-pipe {
    height: 407px;
    top: 100%;
    left: 50%;
    z-index: 2;
    transform: translate(-20%, -50%);
  }

  &--worm-black {
    height: 37.6vh;
    bottom: 0%;
    left: 50%;
    z-index: -1;
    transform: translate(-89%, -5%) rotate(180deg);
  }

  &--worm-black-second {
    height: 38.6vh;
    bottom: 0%;
    left: 50%;
    transform: translate(-21%, -6%) rotate(2deg);
  }

  &--star {
    height: 6.2vh;
    top: 5%;
    left: 50%;
  }

  &--marshmallow {
    height: 12.2vh;
    top: 10%;
    left: 50%;
    z-index: 2;
    transform: translate(100%, 0%);
  }
}

.runway {
  position: absolute;
  bottom: 10.5%;
  left: 92.1%;
  -webkit-transform: translate(-100%, 0%);
  transform: translate(-100%, 0%);
  z-index: 2;
  width: 33px;
  height: 788.4px;
}
</style>

