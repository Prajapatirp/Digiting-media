module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true, // Added node environment
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12, // Changed 'latest' to a specific version
    sourceType: 'module', // Changed 'script' to 'module' for ES modules
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
