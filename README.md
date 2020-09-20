To run a project use `node index.js`

Tests:
* run all tests: `npm test`
* watch mode: `npm test -- --watch`
* verify coverage: `npm test -- --coverage`

ESLint:
* create config file `./node_modules/.bin/eslint --init`
* after adding run script in package.json (explicitly pointed files and directories which should be checked) verification could be done by running `npm run lint`
