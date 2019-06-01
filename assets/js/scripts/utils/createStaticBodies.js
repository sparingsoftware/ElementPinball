import consts from '../consts'
import Trapezoid from '../prefabs/Trapezoid'
import Path from '../prefabs/Path'
import Circle from '../prefabs/Circle'
import Rectangle from '../prefabs/Rectangle'
import Bumper from '../prefabs/Bumper'
import Reset from '../prefabs/Reset'
import Bound from '../prefabs/Bound'
import { setBackground } from './utils'

const createStaticBodies = () => {
  // bounds
  /* eslint-disable */
  new Bound(260, 1615, 450, 5, -2.55) // bottom angle left
  new Bound(740, 1605, 450, 5, 2.55) // bottom angle right
  new Bound(75, 1050, 5, 900) // left
  new Bound(1005, 1160, 5, 1150) // right
  new Bound(949, 1590, 5, 300) // left from shooter

  // temporary without the arc
  new Bound(540, 190, 1080, 5) // top
  new Bound(75, 360, 5, 500) // left
  new Bound(1005, 360, 5, 500) // right
  /* eslint-enable */

  // top elements line
  const leftCylinder = new Path(318, 383, consts.PATHS.LEFT_CYLINDER)
  setBackground(leftCylinder, 'cylinder', { xOffset: 0.44, yOffset: 0.4 })
  const cone = new Trapezoid(500, 455, 70, 80, 1)
  setBackground(cone, 'cone', { xOffset: 0.43, yOffset: 0.44 })
  const doubleCylinderBody = new Rectangle(656, 440, 60, 120) // to prevent ball passing through
  doubleCylinderBody.body.render.opacity = 0
  const rightCylinder = new Path(627, 383, consts.PATHS.RIGHT_CYLINDER)
  setBackground(rightCylinder, 'cylinder', { xOffset: 0.44, yOffset: 0.4 })

  // rocks line
  const leftRock = new Path(265, 678, consts.PATHS.LEFT_ROCK)
  leftRock.body.render.visible = false
  const leftRockCover = new Circle(245, 665, 40)
  setBackground(leftRockCover, 'rock-left', { xOffset: 0.43, yOffset: 0.39 })

  const middleRock = new Path(490, 668, consts.PATHS.MIDDLE_ROCK)
  middleRock.body.render.visible = false
  const middleRockCover = new Circle(500, 660, 40)
  setBackground(middleRockCover, 'rock-right', { xOffset: 0.45, yOffset: 0.44 })

  const rightRock = new Path(735, 678, consts.PATHS.RIGHT_ROCK)
  rightRock.body.render.visible = false
  const rightRockCover = new Circle(745, 670, 40)
  setBackground(rightRockCover, 'rock-right', { xOffset: 0.47, yOffset: 0.44, xScale: 0.6, yScale: 0.6 })

  // flippers lane
  const leftEnvelope = new Path(270, 1230, consts.PATHS.LEFT_ENVELOPE)
  setBackground(leftEnvelope, 'envelope-left', { xOffset: 0.54, yOffset: 0.48 })
  const rightEnvelope = new Path(735, 1230, consts.PATHS.RIGHT_ENVELOPE)
  const doubleEnvelopeBody = new Trapezoid(735, 1200, 180, 90, 2, -1.55) // to prevent ball passing through
  doubleEnvelopeBody.body.render.opacity = 0
  const thirdEnvelopeBody = new Trapezoid(740, 1290, 100, 50, 1, 0.8) // to prevent ball passing through
  thirdEnvelopeBody.body.render.opacity = 0
  setBackground(rightEnvelope, 'envelope-right', { xOffset: 0.45, yOffset: 0.48 })

  const leftTopFlipper = new Path(160, 1215, consts.PATHS.LEFT_TOP_FLIPPER)
  leftTopFlipper.body.render.visible = false
  const leftTopFlipperCover = new Circle(162, 1230, 8)
  setBackground(leftTopFlipperCover, 'zigzag-left', { xOffset: 0.43, yOffset: 0.58 })

  const rightTopFlipper = new Path(830, 1215, consts.PATHS.RIGHT_TOP_FLIPPER)
  rightTopFlipper.body.render.visible = false
  const rightTopFlipperCover = new Circle(833, 1215, 8)
  setBackground(rightTopFlipperCover, 'zigzag-right', { xOffset: 0.43, yOffset: 0.58 })

  const leftLineFlipper = new Rectangle(230, 1420, 146, 5, 0.65) // left line between
  leftLineFlipper.body.render.fillStyle = '#131925'
  const flipperLeftTopCircle = new Circle(175, 1380, 22) // left top
  setBackground(flipperLeftTopCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })
  const flipperLeftBottomCircle = new Circle(300, 1465, 22) // left bottom
  setBackground(flipperLeftBottomCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })

  const rightLineFlipper = new Rectangle(755, 1425, 146, 5, -0.65) // right line between
  rightLineFlipper.body.render.fillStyle = '#131925'
  const flipperRightTopCircle = new Circle(825, 1380, 22) // right top
  setBackground(flipperRightTopCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })
  const flipperRightBottomCircle = new Circle(695, 1470, 22) // right bottom
  setBackground(flipperRightBottomCircle, 'marble', { xOffset: 0.38, yOffset: 0.4, xScale: 0.4, yScale: 0.4 })

  // shooter lane
  const shooterLane = new Rectangle(935, 1060, 37, 864)
  setBackground(shooterLane, 'straight-pipe', { xOffset: 0.4, yOffset: 0.485 })

  // side leaflets
  const leftLeaflet = new Path(85, 950, consts.PATHS.LEFT_LEAFLET)
  leftLeaflet.body.render.visible = false
  const leftLeafletCover = new Circle(70, 940, 20)
  setBackground(leftLeafletCover, 'leaflet-peach', { xOffset: 0.57, yOffset: 0.52 })

  const rightLeaflet = new Trapezoid(895, 940, 340, 135, 1, -1.6)
  rightLeaflet.body.render.visible = false
  const rightLeafletCover = new Circle(895, 940, 20)
  setBackground(rightLeafletCover, 'leaflet-gray', { xOffset: 0.285, yOffset: 0.59 })

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
  const verticalBumperTop = new Bumper(498, 1088, 21)
  setBackground(verticalBumperTop, 'marble-peach', { xOffset: 0.45, yOffset: 0.45, xScale: 0.35, yScale: 0.35 })
  const verticalBumperMiddle = new Bumper(498, 1243, 57)
  setBackground(verticalBumperMiddle, 'marble-peach', { xOffset: 0.45, yOffset: 0.45 })
  const verticalBumperBottom = new Bumper(498, 1398, 21)
  setBackground(verticalBumperBottom, 'marble-peach', { xOffset: 0.45, yOffset: 0.45, xScale: 0.35, yScale: 0.35 })

  // reset zones (center, right)
  /* eslint-disable */
  new Reset(500, 100)
  new Reset(970, 100)
  /* eslint-enable */
}

export {
  createStaticBodies
}
