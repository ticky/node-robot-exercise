#!/usr/bin/env node
'use strict';

var split = require('split'),
    robots = require('../');

var opts = require('nomnom')
    .option('verbose', {
        abbr: 'v',
        flag: true,
        help: 'Output robot status after each command'
    })
    .option('width', {
        appr: 'w',
        default: 5,
        help: 'Set the width of the Table'
    })
    .option('height', {
        appr: 'h',
        default: 5,
        help: 'Set the height of the Table'
    })
    .parse();

var robot = new robots.Robot(new robots.Table(opts.width, opts.height));

process.stdin.pipe(split()).on('data', function(line) {

    robot.command(line);

    if (opts.verbose) {
        console.log('> ' + line);
        console.log('# ' + robot.report());
    }

});