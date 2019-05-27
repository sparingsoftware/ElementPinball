global.decomp = require('poly-decomp')
import Matter from 'matter-js'
import MatterAttractors from 'matter-attractors'
import consts from './consts'
import Bound from './prefabs/Bound'
import Wall from './prefabs/Wall'
import Path from './prefabs/Path'
import Reset from './prefabs/Reset'
import Bumper from './prefabs/Bumper'

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

	function load() {
		init();
		createStaticBodies();
		createPaddles();
		createPinball();
		createEvents();
	}

	function init() {
		// engine (shared)
		window.engine = engine = Matter.Engine.create();

		// world (shared)
		world = engine.world;
		world.bounds = {
			min: { x: 0, y: 0},
			max: { x: 500, y: 800 }
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
				// background: consts.COLOR.BACKGROUND
				background: './src/assets/images/spirala.png'
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
	}

	function createStaticBodies() {
		// table boundaries (top, bottom, left, right)
		new Bound(250, -30, 500, 100)
		new Bound(250, 830, 500, 100)
		new Bound(-30, 400, 100, 800)
		new Bound(530, 400, 100, 800)

		// dome
		new Path(440, 86, consts.PATHS.DOME),

		// pegs (left, mid, right)
		new Wall(140, 140, 20, 40, consts.COLOR.INNER),
		new Wall(225, 140, 20, 40, consts.COLOR.INNER),
		new Wall(310, 140, 20, 40, consts.COLOR.INNER),

		// top bumpers (left, mid, right)
		new Bumper(105, 250),
		new Bumper(225, 250),
		new Bumper(345, 250),

		// bottom bumpers (left, right)
		new Bumper(165, 340),
		new Bumper(285, 340),

		// shooter lane wall
		new Wall(440, 520, 20, 560, consts.COLOR.OUTER),

		// drops (left, right)
		new Path(25, 360, consts.PATHS.DROP_LEFT),
		new Path(425, 360, consts.PATHS.DROP_RIGHT),

		// slingshots (left, right)
		new Wall(120, 510, 20, 120, consts.COLOR.INNER),
		new Wall(330, 510, 20, 120, consts.COLOR.INNER),

		// out lane walls (left, right)
		new Wall(60, 529, 20, 160, consts.COLOR.INNER),
		new Wall(390, 529, 20, 160, consts.COLOR.INNER),

		// flipper walls (left, right);
		new Wall(93, 624, 20, 98, consts.COLOR.INNER, -0.96),
		new Wall(357, 624, 20, 98, consts.COLOR.INNER, 0.96),

		// aprons (left, right)
		new Path(79, 740, consts.PATHS.APRON_LEFT),
		new Path(371, 740, consts.PATHS.APRON_RIGHT),

		// reset zones (center, right)
		new Reset(225, 50),
		new Reset(465, 30)
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
		launchPinball();
	}

	function createEvents() {
		// events for when the pinball hits stuff
		Matter.Events.on(engine, 'collisionStart', function(event) {
			let pairs = event.pairs;
			pairs.forEach(function(pair) {
				if (pair.bodyB.label === 'pinball') {
					switch (pair.bodyA.label) {
						case 'reset':
							launchPinball();
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
			if (pinball.position.x > 450 && pinball.velocity.y > 0) {
				Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
			}
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
	}

	function launchPinball() {
		updateScore(0);
		Matter.Body.setPosition(pinball, { x: 465, y: 765 });
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