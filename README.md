# The Manifest Game

[![Tests](https://github.com/USEPA/the-manifest-game/actions/workflows/test.yaml/badge.svg)](https://github.com/USEPA/the-manifest-game/actions/workflows/test.yaml)
[![Build](https://github.com/USEPA/the-manifest-game/actions/workflows/build.yaml/badge.svg)](https://github.com/USEPA/the-manifest-game/actions/workflows/build.yaml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive decision tree to assist e-Manifest users determine the necessary course of action.

For additional information, see the [project documentation](./docs).

## Getting Started

This project is built with the [NPM](https://www.npmjs.com/) package manager and [vite](https://vitejs.dev/) toolchain.
To build the project, you will need Node.js installed, or Docker.

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

## Testing

To run the tests, use the following command:

```shell
npm run test
```

If you're contributing, we recommend to run the tests in watch mode and
practice [TDD](https://www.google.com/search?q=test+driven+development)

```shell
npm run test:watch
```

To run the tests with coverage, the following command will generate a html/json report in the `coverage` directory
as well as print a summary to the standard out.

```shell
npm run coverage
```

We aim to keep all metrics (statements, branches, & functions) above 90% coverage, however please do not submit dummy
tests to meet this goal.

## Disclaimer

The United States Environmental Protection Agency (EPA) GitHub project code is provided on an "as is" basis and the user
assumes responsibility for its use. EPA has relinquished control of the information and no longer has responsibility to
protect the integrity, confidentiality, or availability of the information. Any reference to specific commercial
products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply
their endorsement, recommendation or favoring by EPA. The EPA seal and logo shall not be used in any manner to imply
endorsement of any commercial product or activity by EPA or the United States Government.
