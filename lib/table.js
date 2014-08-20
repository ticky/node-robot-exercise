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

module.exports = Table;