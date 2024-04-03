# Task 3 Project

This project is a test automation suite using WebDriverIO (WDIO) for the Google Cloud Platform Pricing Calculator web application.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine

### Installation

```bash
git clone https://github.com/elizabethseis/WebDriver-Task-3.git
npm install
```

To run the tests, use the following npm script:
```bash
npm test
```

Viewing Allure Reports
After running the tests, you can generate and view Allure reports:
```bash
npm run allure-report
```

To lint the code, run:
```bash
npm run lint
```

## Project Structure

The project structure is as follows:

- `src/`: Contains the source code for the WebDriverIO setup.
- `tests/`: Contains the test files.
- `config/`: Contains the WebDriverIO configuration file.

## Dependencies
- `@wdio/allure-reporter`: Allure reporter for WebDriverIO.
- `@wdio/cli`: WebDriverIO command line interface.
- `@faker-js/faker`: A library for generating fake data.
- `@wdio/junit-reporter`: JUnit reporter for WebDriverIO.
- `@wdio/local-runner`: WebDriverIO local test runner.
- `@wdio/mocha-framework`: Mocha test framework for WebDriverIO.
- `@wdio/spec-reporter`: Spec reporter for WebDriverIO.
- `eslint`: ESLint for linting.
- `eslint-config-google`: Google ESLint configuration.
- `allure-commandline`: Allure command line tool for generating reports.

## Tests
The test suite is designed to automate the following scenarios for the Google Cloud Platform Pricing Calculator web application:
- Validate the page title.
- Validate the total estimated monthly cost calculation.

The test suite utilizes WebDriverIO and the Page Object Model (POM) design pattern for maintaining the test scripts and page interactions.
