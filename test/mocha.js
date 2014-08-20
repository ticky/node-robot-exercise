'use strict';

/* global describe */
/* global it */
/* global require */

var robots = require('../'),
	assert = require('assert'),
	Robot = robots.Robot,
	Table = robots.Table;

describe('Robot', function() {

	it('should be a function', function() {

		assert.strictEqual(typeof Robot, 'function');

	});

	describe('`x` property', function() {

		it('should reject non-numeric values with an error', function() {

			var robot = new Robot();

			assert.throws(function() {
				robot.x = 'foo';
			});

			assert.throws(function() {
				robot.x = /foo/;
			});

		})

		it('should ignore attempts to set if the Robot is not on a table', function() {

			var robot = new Robot();

			robot.x = 123;

			assert.strictEqual(robot.x, undefined);

		});

		it('should ignore attempts to set if the coordinate is out of range', function() {

			var robot = new Robot(new Table(1, 1));

			robot.x = 2;

			assert.strictEqual(robot.x, undefined);

		});

		it('should correctly set the value if it is a valid number which is in range', function() {

			var robot = new Robot(new Table(5, 5));

			robot.x = 3;

			assert.strictEqual(robot.x, 3);

		});

	});

	describe('`y` property', function() {

		it('should reject non-numeric values with an error', function() {

			var robot = new Robot();

			assert.throws(function() {
				robot.y = 'foo';
			});

			assert.throws(function() {
				robot.y = /foo/;
			});

		})

		it('should ignore attempts to set if the Robot is not on a table', function() {

			var robot = new Robot();

			robot.y = 123;

			assert.strictEqual(robot.y, undefined);

		});

		it('should ignore attempts to set if the coordinate is out of range', function() {

			var robot = new Robot(new Table(1, 1));

			robot.y = 2;

			assert.strictEqual(robot.y, undefined);

		});

		it('should correctly set the value if it is a valid number which is in range', function() {

			var robot = new Robot(new Table(5, 5));

			robot.y = 3;

			assert.strictEqual(robot.y, 3);

		});

	});

	describe('`direction` property', function() {

		it('should ignore attempts to set if the robot is not on a table', function() {

			var robot = new Robot();

			robot.direction = 'SOUTH';

			assert.strictEqual(robot.direction, undefined);

		});

		it('should correctly set the value if the robot is on a table', function() {

			var robot = new Robot(new Table(5, 5));

			robot.direction = 2;

			assert.strictEqual(robot.direction, 2);

		});


	});

	describe('`isOnTable` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.place, 'function');

		});

		it('should return `true` if both the Robot\'s `x` and `y` are `Number`s', function() {

			var mockedRobot = {
				x: 0,
				y: 0
			};

			assert.strictEqual(Robot.prototype.isOnTable.call(mockedRobot), true);

		});

		it('should return `false` if the Robot\'s `x` is not a `Number`', function() {

			var mockedRobot = {
				y: 0
			};

			assert.strictEqual(Robot.prototype.isOnTable.call(mockedRobot), false);

		});

		it('should return `false` if the Robot\'s `y` is not a `Number`', function() {

			var mockedRobot = {
				x: 0
			};

			assert.strictEqual(Robot.prototype.isOnTable.call(mockedRobot), false);

		});

	});

	describe('`place` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.place, 'function');

		});

		it('should throw an Error when an invalid direction is given', function() {

			var robot = new Robot();

			assert.throws(function() {
				robot.place(0, 0, 'LEFT');
			});

		});

		it('should throw an Error if `x` is not a `Number`', function() {

			var robot = new Robot();

			assert.throws(function() {
				robot.place(undefined, 0, 'NORTH');
			});

		});

		it('should throw an Error if `y` is not a `Number`', function() {

			var robot = new Robot();

			assert.throws(function() {
				robot.place(0, undefined, 'NORTH');
			});

		});

	});

	describe('`move` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.move, 'function');

		});

		it('should abort when the robot is not placed on a table', function() {

			var robot = new Robot();

			assert.strictEqual(robot.move(), false);

		});

		it('should increment the Robot\'s `y` by 1 if facing north', function() {

			var robot = new Robot(new Table(1, 2));

			robot.place(0, 0, 'NORTH');

			robot.move();

			assert.strictEqual(robot.y, 1);

			assert.strictEqual(robot.x, 0);

		});

		it('should decrement the Robot\'s `y` by 1 if facing south', function() {

			var robot = new Robot(new Table(1, 2));

			robot.place(0, 1, 'SOUTH');

			robot.move();

			assert.strictEqual(robot.y, 0);

			assert.strictEqual(robot.x, 0);

		});

		it('should increment the Robot\'s `x` by 1 if facing east', function() {

			var robot = new Robot(new Table(2, 1));

			robot.place(0, 0, 'EAST');

			robot.move();

			assert.strictEqual(robot.x, 1);

			assert.strictEqual(robot.y, 0);

		});

		it('should decrement the Robot\'s `x` by 1 if facing west', function() {

			var robot = new Robot(new Table(2, 1));

			robot.place(1, 0, 'WEST');

			robot.move();

			assert.strictEqual(robot.x, 0);

			assert.strictEqual(robot.y, 0);

		});

	});

	describe('`left` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.left, 'function');

		});

		it('should abort when the robot is not placed on a table', function() {

			var robot = new Robot();

			assert.strictEqual(robot.left(), false);

		});

		it('should rotate the direction to the left', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'WEST');

			assert.strictEqual(robot.direction, 3);

			robot.left();

			assert.strictEqual(robot.direction, 2);

			robot.left();

			assert.strictEqual(robot.direction, 1);

			robot.left();

			assert.strictEqual(robot.direction, 0);

			robot.left();

			assert.strictEqual(robot.direction, 3);

		});

	});

	describe('`right` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.right, 'function');

		});

		it('should abort when the robot is not placed on a table', function() {

			var robot = new Robot();

			assert.strictEqual(robot.right(), false);

		});

		it('should rotate the direction to the right', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'NORTH');

			assert.strictEqual(robot.direction, 0);

			robot.right();

			assert.strictEqual(robot.direction, 1);

			robot.right();

			assert.strictEqual(robot.direction, 2);

			robot.right();

			assert.strictEqual(robot.direction, 3);

			robot.right();

			assert.strictEqual(robot.direction, 0);

		});

	});

	describe('`report` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.report, 'function');

		});

		it('should abort when the robot is not placed on a table', function() {

			var robot = new Robot();

			assert.strictEqual(robot.report(), undefined);

		});

		it('should return a comma-separated readout of its position', function() {

			var robot = new Robot(new Table(5, 5));

			robot.place(0, 1, 'NORTH');

			assert.strictEqual(robot.x, 0);
			assert.strictEqual(robot.y, 1);
			assert.strictEqual(robot.direction, 0);

			assert.strictEqual(robot.report(), '0,1,NORTH');

		});

	});

	describe('`command` method', function() {

		it('should be a function', function() {

			var robot = new Robot();

			assert.strictEqual(typeof robot.command, 'function');

		});

		it('should call `place` with arguments given', function() {

			var args,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					place: function() {
						args = Array.prototype.slice.call(arguments);
					}
				};

			Robot.prototype.command.call(mockedRobot, 'PLACE 0,0,NORTH');

			assert.deepEqual(args, [0, 0, 'NORTH']);

		});

		it('shouldn\'t call `place` if the command has no arguments', function() {

			var called = false,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					place: function() {
						called = true;
					}
				};

			Robot.prototype.command.call(mockedRobot, 'PLACE');

			assert.strictEqual(called, false);

		});

		it('should call `move` when the command is "MOVE"', function() {

			var called = false,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					move: function() {
						called = true;
					}
				};

			Robot.prototype.command.call(mockedRobot, 'MOVE');

			assert.strictEqual(called, true);

		});

		it('should call `left` when the command is "MOVE"', function() {

			var called = false,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					left: function() {
						called = true;
					}
				};

			Robot.prototype.command.call(mockedRobot, 'LEFT');

			assert.strictEqual(called, true);

		});

		it('should call `right` when the command is "MOVE"', function() {

			var called = false,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					right: function() {
						called = true;
					}
				};

			Robot.prototype.command.call(mockedRobot, 'RIGHT');

			assert.strictEqual(called, true);

		});

		it('should call `report` when the command is "MOVE"', function() {

			var called = false,
			    mockedRobot = {
					x: 0,
					y: 0,
					direction: 0,
					report: function() {
						called = true;
					}
				};

			Robot.prototype.command.call(mockedRobot, 'REPORT');

			assert.strictEqual(called, true);

		});

	});

});

describe('Table', function() {

	it('should be a function', function() {

		assert.strictEqual(typeof Table, 'function');

	});

	it('should throw an Error when given no width or height', function() {

		assert.throws(function() {
			new Table();
		});

	});

	it('should throw an Error when given no height', function() {

		assert.throws(function() {
			new Table(5);
		});

	});

	it('should set dimensions of grid when given dimensions', function() {

		var table = new Table(10, 10);
		assert.strictEqual(table.width, 10);
		assert.strictEqual(table.height, 10);

	});

});