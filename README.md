# The Manifest Game

[![Tests](https://github.com/USEPA/the-manifest-game/actions/workflows/test.yaml/badge.svg)](https://github.com/USEPA/the-manifest-game/actions/workflows/test.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive decision tree to assist e-Manifest users determine the necessary course of action.

For additional information, see the [project documentation](./docs).

## Getting Started

To build the project, you will need Node.js installed, or Docker. This project uses the Node.js package manager, [NPM](https://www.npmjs.com/), and the [vite](https://vitejs.dev/) build toolchain.

### Starting a local development environment

```shell
# Install dependencies
npm install .
# Start the development server
npm run dev
```

```shell
# Or use Docker
docker build -t the-manifest-game .
docker run -p 3000:3000 the-manifest-game
```

```shell
# Or the Docker Compose file
docker compose up
```

For a list of available commands, see the `scripts` section of the [package.json](./package.json).
For more information on (configuration, building for production, etc.) see the [documentation](./docs).

## Testing

```shell
npm run test
```

If you're contributing, we recommend to run the tests in [watch mode](https://vitest.dev/guide/features#watch-mode) and
practice [TDD](https://www.google.com/search?q=test+driven+development)

```shell
npm run test:watch
```

To run the tests with coverage, the following command will run the test suite and generate an html/json report in the `coverage` directory
as well as print a summary to the standard out.

```shell
npm run coverage
```

We aim to keep all test coverage metrics (statements, branches, & functions) above 90%.

## Disclaimer

The United States Environmental Protection Agency (EPA) GitHub project code is provided on an "as is" basis and the user
assumes responsibility for its use. EPA has relinquished control of the information and no longer has responsibility to
protect the integrity, confidentiality, or availability of the information. Any reference to specific commercial
products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply
their endorsement, recommendation or favoring by EPA. The EPA seal and logo shall not be used in any manner to imply
endorsement of any commercial product or activity by EPA or the United States Government.
