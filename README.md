# Robot Exercise (Node)

A programming exercise, creating an interpreter for programming a “robot”. Think RoboRally but in text only.

This version was built from scratch as a Node module and command-line utility. It shares no code with the version I wrote in 2013.

## Usage

You will need `node` and `npm` installed.

To get up and running, you can simply `cd` into the checked out repository, run `npm install`, then `node bin/robots.js`.

The command-line utility accepts commands from standard input. You can either type commands yourself having started the program, or pipe them in;

```shell
node bin/robots.js < scripts/script1
```

## Tests

A test suite is provided. To run the tests themselves, you will need to run `npm install -g mocha`, after which tests can be run from the checked out repositry by running `npm test`.

To get a code coverage report, you can `npm install -g istanbul` and run `npm run-script coverage`. Statistics are printed to the terminal, and additional information can be found in HTML output in the `coverage` directory.