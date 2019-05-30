global.decomp = require('poly-decomp')
import './scss/app.scss'
import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import consts from './scripts/consts'
import Trapezoid from './scripts/prefabs/Trapezoid'
import Path from './scripts/prefabs/Path'
import Circle from './scripts/prefabs/Circle'
import Rectangle from './scripts/prefabs/Rectangle'
import Reset from './scripts/prefabs/Reset'

(() => {
	// plugins
	Matter.use(MatterAttractors);

	// score elements
	let $currentScore = document.querySelector('.current-score span');
	let $highScore = document.querySelector('.high-score span');

	// shared variables
	let currentScore, highScore;
	let engine, world, render, pinball, stopperGroup;
	let leftPaddle, leftUpStopper, leftDownStopper, isLeftPaddleUp;
	let rightPaddle, rightUpStopper, rightDownStopper, isRightPaddleUp;
	let isPinballBlocked;

	function load() {
		init();
		createStaticBodies();
		// createPaddles();
		// createPinball();
		// createEvents();
	}

	function init() {
		// engine (shared)
		window.engine = engine = Matter.Engine.create();

		// world (shared)
		world = engine.world;
		world.bounds = {
			min: { x: 0, y: 0},
			max: { x: 1080, y: 1920 }
		};
		world.gravity.y = consts.GRAVITY; // simulate rolling on a slanted table

		// render (shared)
		render = Matter.Render.create({
			element: document.querySelector('.game-container'),
			engine: engine,
			options: {
				width: world.bounds.max.x,
				height: world.bounds.max.y,
				wireframes: consts.WIREFRAMES,
				background: 'transparent'
			}
		});
		Matter.Render.run(render);

		// runner
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// used for collision filtering on various bodies
		stopperGroup = Matter.Body.nextGroup(true);

		// starting values
		currentScore = 0;
		highScore = 0;
		isLeftPaddleUp = false;
		isRightPaddleUp = false;
		isPinballBlocked = true;
	}

	function createStaticBodies() {
		//bounds
		new Rectangle(540, 190, 1080, 5) //top
		new Rectangle(260, 1615, 450, 5, -2.55) // bottom angle left
		new Rectangle(740, 1605, 450, 5, 2.55) // bottom angle right
		new Rectangle(150, 1705, 270, 5, 2.3) // bottom decoration
		new Rectangle(75, 1050, 5, 900) // left
		new Rectangle(1005, 1160, 5, 1150) // right
		new Rectangle(950, 1590, 5, 300) // left from shooter

		// temporary rects
		new Rectangle(75, 360, 5, 500) // left
		new Rectangle(1005, 360, 5, 500) // right

		//top elements line
		new Path(318, 383, consts.PATHS.LEFT_CYLINDER)
		new Trapezoid(500, 455, 70, 80, 1)
		new Path(627, 383, consts.PATHS.RIGHT_CYLINDER)

		//rocks line
		new Path(265, 678, consts.PATHS.LEFT_ROCK)
		new Path(490, 668, consts.PATHS.MIDDLE_ROCK)
		new Path(735, 678, consts.PATHS.RIGHT_ROCK)

		//flippers lane
		new Path(270, 1230, consts.PATHS.LEFT_TRIANGLE)
		new Path(735, 1230, consts.PATHS.RIGHT_TRIANGLE)
		new Path(160, 1230, consts.PATHS.LEFT_TOP_FLIPPER)
		new Path(830, 1215, consts.PATHS.RIGHT_TOP_FLIPPER)
		new Rectangle(755, 1425, 146, 5, -0.65) // right line between
		new Circle(825, 1380, 22) // right top
		new Circle(695, 1470, 22) // right bottom
		new Rectangle(230, 1420, 146, 5, 0.65) // left line between
		new Circle(175, 1380, 22) // left top
		new Circle(300, 1465, 22) // left bottom

		//side leafs
		new Trapezoid(895, 940, 340, 135, 1, -1.6)
		new Path(85, 950, consts.PATHS.LEFT_LEAF)

		//shooter lane
		new Rectangle(935, 1060, 37, 864)

		//pipes
		new Path(820, 495, consts.PATHS.TOP_PIPE)
		new Path(150, 900, consts.PATHS.BOTTOM_PIPE)

		// horizontal circle bumpers
		new Circle(373, 880, 53)
		new Circle(621, 880, 53)

		// vertical circle bumpers
		new Circle(498, 1088, 21)
		new Circle(498, 1243, 57)
		new Circle(498, 1398, 21)

		// // reset zones (center, right)
		new Reset(500, 100)
		new Reset(970, 100)
	}

	function createPaddles() {
		// these bodies keep paddle swings contained, but allow the ball to pass through
		leftUpStopper = stopper(160, 591, 'left', 'up');
		leftDownStopper = stopper(140, 743, 'left', 'down');
		rightUpStopper = stopper(290, 591, 'right', 'up');
		rightDownStopper = stopper(310, 743, 'right', 'down');
		Matter.World.add(world, [leftUpStopper, leftDownStopper, rightUpStopper, rightDownStopper]);

		// this group lets paddle pieces overlap each other
		let paddleGroup = Matter.Body.nextGroup(true);

		// Left paddle mechanism
		let paddleLeft = {};
		paddleLeft.paddle = Matter.Bodies.trapezoid(170, 660, 20, 80, 0.33, {
			label: 'paddleLeft',
			angle: 1.57,
			chamfer: {},
			render: {
				fillStyle: consts.COLOR.PADDLE
			}
		});
		paddleLeft.brick = Matter.Bodies.rectangle(172, 672, 40, 80, {
			angle: 1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleLeft.comp = Matter.Body.create({
			label: 'paddleLeftComp',
			parts: [paddleLeft.paddle, paddleLeft.brick]
		});
		paddleLeft.hinge = Matter.Bodies.circle(142, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleLeft).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleLeft.con = Matter.Constraint.create({
			bodyA: paddleLeft.comp,
			pointA: { x: -29.5, y: -8.5 },
			bodyB: paddleLeft.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
		Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });

		// right paddle mechanism
		let paddleRight = {};
		paddleRight.paddle = Matter.Bodies.trapezoid(280, 660, 20, 80, 0.33, {
			label: 'paddleRight',
			angle: -1.57,
			chamfer: {},
			render: {
				fillStyle: consts.COLOR.PADDLE
			}
		});
		paddleRight.brick = Matter.Bodies.rectangle(278, 672, 40, 80, {
			angle: -1.62,
			chamfer: {},
			render: {
				visible: false
			}
		});
		paddleRight.comp = Matter.Body.create({
			label: 'paddleRightComp',
			parts: [paddleRight.paddle, paddleRight.brick]
		});
		paddleRight.hinge = Matter.Bodies.circle(308, 660, 5, {
			isStatic: true,
			render: {
				visible: false
			}
		});
		Object.values(paddleRight).forEach((piece) => {
			piece.collisionFilter.group = paddleGroup
		});
		paddleRight.con = Matter.Constraint.create({
			bodyA: paddleRight.comp,
			pointA: { x: 29.5, y: -8.5 },
			bodyB: paddleRight.hinge,
			length: 0,
			stiffness: 0
		});
		Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
		Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
	}

	function createPinball() {
		// x/y are set to when pinball is launched
		pinball = Matter.Bodies.circle(0, 0, 14, {
			label: 'pinball',
			collisionFilter: {
				group: stopperGroup
			},
			render: {
				fillStyle: consts.COLOR.PINBALL
			}
		});
		Matter.World.add(world, pinball);
		dockPinball();
	}

	function createEvents() {
		// events for when the pinball hits stuff
		Matter.Events.on(engine, 'collisionStart', function(event) {
			let pairs = event.pairs;
			pairs.forEach(function(pair) {
				if (pair.bodyB.label === 'pinball') {
					switch (pair.bodyA.label) {
						case 'reset':
							dockPinball();
							break;
						case 'bumper':
							pingBumper(pair.bodyA);
							break;
					}
				}
			});
		});

		// regulate pinball
		Matter.Events.on(engine, 'beforeUpdate', function(event) {
			// bumpers can quickly multiply velocity, so keep that in check
			Matter.Body.setVelocity(pinball, {
				x: Math.max(Math.min(pinball.velocity.x, consts.MAX_VELOCITY), -consts.MAX_VELOCITY),
				y: Math.max(Math.min(pinball.velocity.y, consts.MAX_VELOCITY), -consts.MAX_VELOCITY),
			});

			// cheap way to keep ball from going back down the shooter lane
			// if (pinball.position.x > 450 && pinball.velocity.y > 0) {
			// 	Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
			// }
		});

		// mouse drag (god mode for grabbing pinball)
		Matter.World.add(world, Matter.MouseConstraint.create(engine, {
			mouse: Matter.Mouse.create(render.canvas),
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		}));

		// keyboard paddle events
		document.body.addEventListener('keydown', function(e) {
			if (e.which === 37) { // left arrow key
				isLeftPaddleUp = true;
			} else if (e.which === 39) { // right arrow key
				isRightPaddleUp = true;
			}
		});
		document.body.addEventListener('keyup', function(e) {
			if (e.which === 37) { // left arrow key
				isLeftPaddleUp = false;
			} else if (e.which === 39) { // right arrow key
				isRightPaddleUp = false;
			}
		});

		document.body.addEventListener('keyup', function(e) {
			if (e.which === 13 && isPinballBlocked) { // left arrow key
				launchPinball()
				isPinballBlocked = false
			}
		});
	}

	function dockPinball() {
		updateScore(0);
		isPinballBlocked = true
		Matter.Body.setPosition(pinball, { x: 465, y: 755 });
	}

	function launchPinball() {
		Matter.Body.setPosition(pinball, { x: 465, y: 755 });
		Matter.Body.setVelocity(pinball, { x: 0, y: -25 + rand(-2, 2) });
		Matter.Body.setAngularVelocity(pinball, 0);
	}

	function pingBumper(bumper) {
		updateScore(currentScore + 10);

		// flash color
		bumper.render.fillStyle = consts.COLOR.BUMPER_LIT;
		setTimeout(function() {
			bumper.render.fillStyle = consts.COLOR.BUMPER;
		}, 100);
	}

	function updateScore(newCurrentScore) {
    currentScore = newCurrentScore;
    $currentScore.innerHTML = currentScore;

		highScore = Math.max(currentScore, highScore);
		$highScore.innerHTML = highScore;
	}

	// matter.js has a built in random range function, but it is deterministic
	function rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	// invisible bodies to constrict paddles
	function stopper(x, y, side, position) {
		// determine which paddle composite to interact with
		let attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp';

		return Matter.Bodies.circle(x, y, 40, {
			isStatic: true,
			render: {
				visible: false,
			},
			collisionFilter: {
				group: stopperGroup
			},
			plugin: {
				attractors: [
					// stopper is always a, other body is b
					function(a, b) {
						if (b.label === attracteeLabel) {
							let isPaddleUp = (side === 'left') ? isLeftPaddleUp : isRightPaddleUp;
							let isPullingUp = (position === 'up' && isPaddleUp);
							let isPullingDown = (position === 'down' && !isPaddleUp);
							if (isPullingUp || isPullingDown) {
								return {
									x: (a.position.x - b.position.x) * consts.PADDLE_PULL,
									y: (a.position.y - b.position.y) * consts.PADDLE_PULL,
								};
							}
						}
					}
				]
			}
		});
	}

	window.addEventListener('load', load, false);
})();