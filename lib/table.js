'use strict';

/* global module */

function Table(width, height) {

	if (typeof width === 'number') {
		this.width = width;
	} else {
		throw new Error('Table width must be a number');
	}

	if (typeof height === 'number') {
		this.height = height;
	} else {
		throw new Error('Table height must be a number');
	}

}

Table.prototype.isValidCoordinate = function(x, y) {

	return typeof x === 'number'
		&& x >= 0
		&& x < this.width
		&& typeof y === 'number'
		&& y >= 0
		&& y < this.height;

};

module.exports = Table;