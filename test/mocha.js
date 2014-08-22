'use strict';

/* global describe */
/* global it */
/* global require */

var robots = require('../'),
	assert = require('assert'),
	Robot = robots.Robot,
	Table = robots.Table;

describe('Robot', function() {

	describe('`isOnTable` method', function() {

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

		it('should abort when the Robot has no Table', function() {

			var robot = new Robot();

			assert.strictEqual(robot.place(0, 0, 'NORTH'), undefined);

			assert.strictEqual(typeof robot.x, 'undefined');
			assert.strictEqual(typeof robot.y, 'undefined');
			assert.strictEqual(typeof robot.direction, 'undefined');

		});

		it('should throw an Error when an invalid direction is given', function() {

			var robot = new Robot(new Table(1, 1));

			assert.throws(function() {
				robot.place(0, 0, 'LEFT');
			});

			assert.strictEqual(typeof robot.x, 'undefined');
			assert.strictEqual(typeof robot.y, 'undefined');
			assert.strictEqual(typeof robot.direction, 'undefined');

		});

		it('should abort if `x` is not a `Number`', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(undefined, 0, 'NORTH');

			assert.strictEqual(typeof robot.x, 'undefined');
			assert.strictEqual(typeof robot.y, 'undefined');
			assert.strictEqual(typeof robot.direction, 'undefined');

		});

		it('should abort if `y` is not a `Number`', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, undefined, 'NORTH');

			assert.strictEqual(typeof robot.x, 'undefined');
			assert.strictEqual(typeof robot.y, 'undefined');
			assert.strictEqual(typeof robot.direction, 'undefined');

		});

	});

	describe('`move` method', function() {

		it('should abort when the Robot has not been placed', function() {

			var robot = new Robot(new Table(1, 1));

			assert.strictEqual(robot.move(), false);

		});

		it('should increment the Robot\'s `y` by 1 if facing north', function() {

			var robot = new Robot(new Table(1, 2));

			robot.place(0, 0, 'NORTH');

			robot.move();

			assert.strictEqual(robot.y, 1);

			assert.strictEqual(robot.x, 0);

		});

		it('should abort if the new position to the north would be off the Table', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'NORTH');

			robot.move();

			assert.strictEqual(robot.y, 0);

			assert.strictEqual(robot.x, 0);

		});

		it('should decrement the Robot\'s `y` by 1 if facing south', function() {

			var robot = new Robot(new Table(1, 2));

			robot.place(0, 1, 'SOUTH');

			robot.move();

			assert.strictEqual(robot.y, 0);

			assert.strictEqual(robot.x, 0);

		});

		it('should abort if the new position to the south would be off the Table', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'SOUTH');

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

		it('should abort if the new position to the east would be off the Table', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'EAST');

			robot.move();

			assert.strictEqual(robot.y, 0);

			assert.strictEqual(robot.x, 0);

		});

		it('should decrement the Robot\'s `x` by 1 if facing west', function() {

			var robot = new Robot(new Table(2, 1));

			robot.place(1, 0, 'WEST');

			robot.move();

			assert.strictEqual(robot.x, 0);

			assert.strictEqual(robot.y, 0);

		});

		it('should abort if the new position to the west would be off the Table', function() {

			var robot = new Robot(new Table(1, 1));

			robot.place(0, 0, 'WEST');

			robot.move();

			assert.strictEqual(robot.y, 0);

			assert.strictEqual(robot.x, 0);

		});

	});

	describe('`left` method', function() {

		it('should abort when the Robot has not been placed', function() {

			var robot = new Robot(new Table(1, 1));

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

		it('should abort when the Robot has not been placed', function() {

			var robot = new Robot(new Table(1, 1));

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

		it('should abort when the Robot has not been placed', function() {

			var robot = new Robot(new Table(1, 1));

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
						return '';
					}
				};

			Robot.prototype.command.call(mockedRobot, 'REPORT');

			assert.strictEqual(called, true);

		});

	});

});

describe('Table', function() {

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

	describe('`isValidCoordinate` method', function() {

		var table = new Table(5, 5);

		it('should return `true` if coordinate is within the Table\'s dimensions', function() {

			assert.strictEqual(table.isValidCoordinate(0, 0), true);
			assert.strictEqual(table.isValidCoordinate(2, 0), true);
			assert.strictEqual(table.isValidCoordinate(0, 2), true);
			assert.strictEqual(table.isValidCoordinate(2, 2), true);
			assert.strictEqual(table.isValidCoordinate(4, 0), true);
			assert.strictEqual(table.isValidCoordinate(0, 4), true);
			assert.strictEqual(table.isValidCoordinate(4, 4), true);

		});

		it('should return `false` if `x` is not a `Number`', function() {

			assert.strictEqual(table.isValidCoordinate("0", 0), false);

		});

		it('should return `false` if `y` is not a `Number`', function() {

			assert.strictEqual(table.isValidCoordinate(0, "0"), false);

		});

		it('should return `false` if `x` is less than `0`', function() {

			assert.strictEqual(table.isValidCoordinate(-1, 0), false);

		});

		it('should return `false` if `y` is less than `0`', function() {

			assert.strictEqual(table.isValidCoordinate(0, -1), false);

		});

		it('should return `false` if `x` is more than the Table\'s width', function() {

			assert.strictEqual(table.isValidCoordinate(5, 0), false);

		});

		it('should return `false` if `y` is more than the Table\'s width', function() {

			assert.strictEqual(table.isValidCoordinate(0, 5), false);

		});

	});

});