# Robot Exercise (Node)

A programming exercise, creating an interpreter for programming a “robot”. Think RoboRally but in text only.

_**Note**: This version was built from scratch as a Node module and command-line utility. It shares no code with the version I wrote in 2013._

## Requirements

* [node.js](http://nodejs.org)

## Installation

Installation is simple; you can install the current version from GitLab using `npm`;

```shell
npm install -g https://gitlab.com/geoffstokes/node-robot-exercise/repository/archive.tar.gz
```

_**Note**: You can also clone the repository and run `node bin/robots.js`. In examples which use `robot-exercise` as the command name, `node bin/robots.js` is equivalent if cloned manually._

## Command-line use

The command-line utility accepts commands from standard input. You can either type commands yourself having started the program, or pipe them in;

```shell
robot-exercise < scripts/script1
```

There are some additional command-line options, which you can show by running `robot-exercise --help`.

## Tests

A test suite is provided, and code coverage output can be produced.

To run the test suite and generate a code coverage report;
```shell
npm run-script -g robot-exercise coverage
```

The code coverage report will be produced in the installation directory. On an OS X system with `node` installed via Homebrew, it is at `/usr/local/lib/node_modules/robot-exercise/coverage/lcov-report/index.html`.

To run the test suite without generating a code coverage report;
```shell
npm test -g robot-exercise
```

_**Note**: If cloned manually, you can run these commands by omitting `-g robot-exercise`. The coverage report will be produced at `coverage/lcov-report/index.html`_

## License

MIT (See `LICENSE.md` for details)