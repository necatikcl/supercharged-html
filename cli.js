#!/usr/bin/env node

const { default: compileHTML } = require('./lib/cjs/index');

const production = process.argv.includes('build');

compileHTML({
  production,
  srcDir: './playground/src',
  outputDir: './playground/dist',
});
