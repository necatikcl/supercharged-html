module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ], // Uses the linting rules from @typescript-eslint/eslint-plugin
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    node: true, // Enable Node.js global variables
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
};
