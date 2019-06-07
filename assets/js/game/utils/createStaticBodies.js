import Matter from 'matter-js'
import consts from '../consts'
import Trapezoid from '../prefabs/Trapezoid'
import Path from '../prefabs/Path'
import Circle from '../prefabs/Circle'
import Rectangle from '../prefabs/Rectangle'
import Bumper from '../prefabs/Bumper'
import Reset from '../prefabs/Reset'
import Bound from '../prefabs/Bound'
import Dome from '../prefabs/Dome'
import { setBackground } from './utils'

const createStaticBodies = () => {
  // bounds
  /* eslint-disable */
  new Bound(250, 1625, 460, 40, -2.53) // bottom angle left
  new Bound(745, 1625, 460, 40, 2.54) // bottom angle right
  new Bound(28, 1050, 100, 900) // left
  new Bound(1015, 1160, 20, 1150) // right
  new Bound(942, 1605, 20, 260) // left from shooter

  // temporary without the arc
  new Bound(540, 184, 1080, 20) // top

  const domeRight = new Dome(925, 340, consts.PATHS.DOME)
  Matter.Body.scale(domeRight.body, 2, 2)

  const domeLeft = new Dome(205, 295, consts.PATHS.DOME)
  Matter.Body.scale(domeLeft.body, 2, 2)
  Matter.Body.rotate(domeLeft.body, -1.63)

  const angledLine = new Rectangle(175, 1675, 200, 5)
  setBackground(angledLine, 'line-peach', { xOffset: 0.62, yOffset: 0.36 })

  // top elements line
  const leftCylinder = new Path(318, 383, consts.PATHS.LEFT_CYLINDER)
  leftCylinder.body.render.opacity = 0
  const doubleLeftCylinderBody = new Rectangle(350, 438, 60, 120, 0, 30) // to prevent ball passing through
  doubleLeftCylinderBody.body.label = 'cylinder'
  doubleLeftCylinderBody.body.restitution = consts.BUMPER_BOUNCE // bounce
  setBackground(doubleLeftCylinderBody, 'cylinder', { xOffset: 0.44, yOffset: 0.4 })

  const cone = new Trapezoid(500, 455, 70, 80, 1)
  setBackground(cone, 'cone', { xOffset: 0.43, yOffset: 0.44 })
  cone.body.restitution = consts.BUMPER_BOUNCE // bounce

  const rightCylinder = new Path(627, 383, consts.PATHS.RIGHT_CYLINDER)
  rightCylinder.body.render.opacity = 0
  const doubleRightCylinderBody = new Rectangle(656, 440, 60, 120, 0, 30) // to prevent ball passing through
  doubleRightCylinderBody.body.label = 'cylinder'
  doubleRightCylinderBody.body.restitution = consts.BUMPER_BOUNCE // bounce
  setBackground(doubleRightCylinderBody, 'cylinder', { xOffset: 0.44, yOffset: 0.4 })

  // rocks line
  const leftRock = new Path(265, 678, consts.PATHS.LEFT_ROCK)
  const leftRockBound = new Circle(245, 665, 58)
  leftRockBound.body.render.opacity = 0
  leftRock.body.render.visible = false
  const leftRockCover = new Circle(245, 665, 40)
  leftRockCover.body.render.visible = false
  // setBackground(leftRockCover, 'rock-left', { xOffset: 0.43, yOffset: 0.39 })
  leftRock.body.restitution = consts.SMALL_BOUNCE // bounce

  const middleRock = new Path(490, 668, consts.PATHS.MIDDLE_ROCK)
  const middleRockBound = new Circle(500, 650, 90)
  middleRockBound.body.render.opacity = 0
  middleRock.body.render.visible = false
  const middleRockCover = new Circle(500, 660, 40)
  middleRockCover.body.render.visible = false
  // setBackground(middleRockCover, 'rock-right', { xOffset: 0.45, yOffset: 0.44 })
  middleRock.body.restitution = consts.SMALL_BOUNCE // bounce

  const rightRock = new Path(735, 678, consts.PATHS.RIGHT_ROCK)
  const rightRockBound = new Circle(745, 670, 58)
  rightRockBound.body.render.opacity = 0
  rightRock.body.render.visible = false
  const rightRockCover = new Circle(745, 670, 40)
  rightRockCover.body.render.visible = false
  // setBackground(rightRockCover, 'rock-right', { xOffset: 0.47, yOffset: 0.44, xScale: 0.6, yScale: 0.6 })
  rightRock.body.restitution = consts.SMALL_BOUNCE // bounce

  // flippers lane
  const leftEnvelope = new Path(270, 1230, consts.PATHS.LEFT_ENVELOPE)
  const doubleLeftEnvelopeBody = new Trapezoid(270, 1200, 90, 180, 2, 0) // to prevent ball passing through
  doubleLeftEnvelopeBody.body.render.opacity = 0
  doubleLeftEnvelopeBody.body.restitution = consts.ENVELOPE_BOUNCE // bouncy element of envelope
  setBackground(leftEnvelope, 'envelope-left', { xOffset: 0.54, yOffset: 0.48 })

  const rightEnvelope = new Path(735, 1230, consts.PATHS.RIGHT_ENVELOPE)
  const doubleRightEnvelopeBody = new Trapezoid(735, 1200, 180, 90, 2, -1.55) // to prevent ball passing through
  doubleRightEnvelopeBody.body.render.opacity = 0
  doubleRightEnvelopeBody.body.restitution = consts.ENVELOPE_BOUNCE // bouncy element of envelope
  const thirdEnvelopeBody = new Trapezoid(740, 1290, 100, 50, 1, 0.8) // to prevent ball passing through
  thirdEnvelopeBody.body.render.opacity = 0
  setBackground(rightEnvelope, 'envelope-right', { xOffset: 0.45, yOffset: 0.48 })

  const leftTopFlipper = new Path(160, 1215, consts.PATHS.LEFT_TOP_FLIPPER)
  new Bound(160, 1220, 30, 290, -0.05)
  leftTopFlipper.body.render.visible = false
  const leftTopFlipperCover = new Circle(162, 1230, 8)
  setBackground(leftTopFlipperCover, 'zigzag-left', { xOffset: 0.43, yOffset: 0.58 })

  const rightTopFlipper = new Path(830, 1215, consts.PATHS.RIGHT_TOP_FLIPPER)
  new Bound(830, 1220, 30, 290, 0.05)
  rightTopFlipper.body.render.visible = false
  const rightTopFlipperCover = new Circle(833, 1215, 8)
  setBackground(rightTopFlipperCover, 'zigzag-right', { xOffset: 0.43, yOffset: 0.58 })

  const leftLineFlipper = new Rectangle(230, 1420, 146, 5, 0.65) // left line between
  leftLineFlipper.body.render.fillStyle = '#131925'
  new Bound(230, 1445, 146, 40, 0.65)

  const flipperLeftTopCircle = new Circle(175, 1380, 22) // left top
  setBackground(flipperLeftTopCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })
  const flipperLeftBottomCircle = new Circle(300, 1465, 22) // left bottom
  setBackground(flipperLeftBottomCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })

  new Bound(270, 1448, 70, 20, 0.3) // rectangle for unstick ball on left flipper
  new Bound(270, 1448, 70, 20, 0.3) // rectangle for unstick ball on left flipper

  const rightLineFlipper = new Rectangle(755, 1425, 146, 5, -0.65) // right line between
  rightLineFlipper.body.render.fillStyle = '#131925'
  new Bound(770, 1440, 146, 40, -0.65)

  const flipperRightTopCircle = new Circle(825, 1380, 22) // right top
  setBackground(flipperRightTopCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })
  const flipperRightBottomCircle = new Circle(695, 1470, 22) // right bottom
  setBackground(flipperRightBottomCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })

  new Bound(720, 1450, 70, 20, -0.3) // rectangle for unstick ball on right flipper
  new Bound(720, 1450, 70, 20, -0.3) // rectangle for unstick ball on right flipper

  // shooter lane
  const shooterLane = new Rectangle(935, 1060, 37, 864)
  setBackground(shooterLane, 'straight-pipe', { xOffset: 0.4, yOffset: 0.485 })

  // side leaflets
  const leftLeaflet = new Path(85, 950, consts.PATHS.LEFT_LEAFLET)
  leftLeaflet.body.render.visible = false
  const leftLeafletCover = new Circle(70, 940, 20)
  setBackground(leftLeafletCover, 'leaflet-peach', { xOffset: 0.57, yOffset: 0.52 })
  leftLeaflet.body.restitution = consts.SMALL_BOUNCE // bounce

  const rightLeaflet = new Trapezoid(895, 940, 340, 135, 1, -1.6)
  rightLeaflet.body.render.visible = false
  const rightLeafletCover = new Circle(895, 940, 20)
  setBackground(rightLeafletCover, 'leaflet-gray', { xOffset: 0.285, yOffset: 0.59 })
  rightLeaflet.body.restitution = consts.SMALL_BOUNCE // bounce

  // pipes
  const topPipe = new Path(820, 495, consts.PATHS.TOP_PIPE)
  topPipe.body.render.visible = false
  const topPipeCover = new Circle(835, 485, 20)
  setBackground(topPipeCover, 'quater-pipe-top', { xOffset: 0.58, yOffset: 0.4 })

  const bottomPipe = new Path(150, 900, consts.PATHS.BOTTOM_PIPE)
  bottomPipe.body.render.visible = false
  const bottomPipeCover = new Circle(140, 910, 20)
  setBackground(bottomPipeCover, 'quater-pipe-bottom', { xOffset: 0.41, yOffset: 0.6 })

  // horizontal circle bumpers
  const horizontalBumperLeft = new Bumper(373, 880, 53)
  setBackground(horizontalBumperLeft, 'marble', { xOffset: 0.39, yOffset: 0.39 })
  const horizontalBumperRight = new Bumper(621, 880, 53)
  setBackground(horizontalBumperRight, 'marble', { xOffset: 0.39, yOffset: 0.39 })

  // vertical circle bumpers
  // const verticalBumperTop = new Bumper(498, 1088, 21)
  // setBackground(verticalBumperTop, 'marble-peach', { xOffset: 0.45, yOffset: 0.45, xScale: 0.35, yScale: 0.35 })
  // const verticalBumperMiddle = new Bumper(498, 1243, 57)
  // setBackground(verticalBumperMiddle, 'marble-peach', { xOffset: 0.45, yOffset: 0.45 })
  const verticalBumperMiddle = new Bumper(498, 1100, 50)
  setBackground(verticalBumperMiddle, 'marble-peach', { xOffset: 0.45, yOffset: 0.45, xScale: 0.9, yScale: 0.9 })
  // const verticalBumperBottom = new Bumper(498, 1398, 21)
  // setBackground(verticalBumperBottom, 'marble-peach', { xOffset: 0.45, yOffset: 0.45, xScale: 0.35, yScale: 0.35 })

  // reset zones (center, right)
  new Reset(500, 1810, 150) // out
  new Reset(970, 1810, 150) // dock
  /* eslint-enable */
}

export {
  createStaticBodies
}
