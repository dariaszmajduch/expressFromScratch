/**
 * 1. in 'env' section: we define which packages are allowed - after adding i.e. jest 
 * all unknown global variables (test, jest, expect, ...) are recognized
 * 2. in 'rules' section: some rules could be turn off if we prefer other configuration or if needed changes
 * take too much time or curently impossible to resolve
 * 3. rules could be disabled also for specific part of code (see handlers.js file)
 * 4. other errors should be resolved as it is proposed in ESLint documentation
 */
module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-console": "off",
    }
};
