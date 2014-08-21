'use strict';

/* global console */
/* global module */

function Robot(table) {

    if (typeof table === 'object') {
        this.table = table;
    }

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

    if (typeof this.table !== 'object') {
        return;
    }

    var newDirection = Robot.directions.indexOf(direction);
    if (newDirection === -1) {
        throw new Error('Direction must be either \'NORTH\', \'EAST\', \'SOUTH\' or \'WEST\'');
    }

    if (!this.table.isValidCoordinate(x, y)) {
        return;
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
        command = parts.shift(),
        args = [];

    if (parts.length > 0) {
        args = parts.join('').split(',');
        args[0] = parseInt(args[0], 10);
        args[1] = parseInt(args[1], 10);
    }

    switch(command) {

        case 'PLACE':
            this.place.apply(this, args);
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