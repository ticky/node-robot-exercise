'use strict';

/* global console */
/* global module */

function Robot(table) {

    var x, y, direction;

    if (typeof table === 'object') {
        this.table = table;
    }

    Object.defineProperties(this, {

        x: {
            set: function(value) {
                if (typeof value !== 'number') {
                    throw new Error('A robot\'s \'x\' position must be a Number');
                }
                if (typeof this.table !== 'object') {
                    return;
                }
                if (value < 0 || value > this.table.width - 1) {
                    return;
                }
                x = value;
            },
            get: function() {
                return x;
            },
            enumerable: true
        },

        y: {
            set: function(value) {
                if (typeof value !== 'number') {
                    throw new Error('A robot\'s \'y\' position must be a Number');
                }
                if (typeof this.table !== 'object') {
                    return;
                }
                if (value < 0 || value > this.table.height - 1) {
                    return;
                }
                y = value;
            },
            get: function() {
                return y;
            },
            enumerable: true
        },

        direction: {
            set: function(value) {
                if (typeof this.table !== 'object') {
                    return;
                }
                direction = value;
            },
            get: function() {
                return direction;
            },
            enumerable: true
        }

    });

}

Robot.directions = [
    'NORTH',
    'EAST',
    'SOUTH',
    'WEST'
];

Robot.prototype.isOnTable = function () {

    return (typeof this.x === 'number' && typeof this.y === 'number');

};

Robot.prototype.place = function (x, y, direction) {

    var newDirection = Robot.directions.indexOf(direction);
    if (newDirection === -1) {
        throw new Error('Direction must be either \'NORTH\', \'EAST\', \'SOUTH\' or \'WEST\'');
    }

    this.x = x;
    this.y = y;
    this.direction = newDirection;

};

Robot.prototype.move = function () {

    if (!this.isOnTable()) {
        return false;
    }

    var extent;

    if (this.direction < 2) {
        extent = 1;
    } else {
        extent = -1;
    }

    if (this.direction % 2 === 0) {
        // Direction is vertical
        this.y += extent;
    } else {
        // Direction is horizontal
        this.x += extent;
    }

};

Robot.prototype.left = function () {

    if (!this.isOnTable()) {
        return false;
    }

    if (this.direction === 0) {
        this.direction = Robot.directions.length - 1;
    } else {
        this.direction--;
    }

};

Robot.prototype.right = function () {

    if (!this.isOnTable()) {
        return false;
    }

    if (this.direction === Robot.directions.length - 1) {
        this.direction = 0;
    } else {
        this.direction++;
    }

};

Robot.prototype.report = function () {

    if (!this.isOnTable()) {
        return;
    }

    return [this.x.toString(10), this.y.toString(10), Robot.directions[this.direction]].join(',');

};

Robot.prototype.command = function (text) {

    var parts = text.split(' '),
        command = parts.shift();

    switch(command) {

        case 'PLACE':
            if (parts.length > 0) {
                this.place.apply(this, parts[0].split(',').map(function(argument, index) {
                    if (index < 2) {
                        return parseInt(argument, 10);
                    }
                    return argument;
                }));
            }
            break;

        case 'MOVE':
            this.move();
            break;

        case 'LEFT':
            this.left();
            break;

        case 'RIGHT':
            this.right();
            break;

        case 'REPORT':
            console.log(this.report());
            break;

    }

};

module.exports = Robot;