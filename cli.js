#!/usr/bin/env node

const compileHTML = require('./index');

const isProduction = process.argv.includes('build');

compileHTML({ production: isProduction });