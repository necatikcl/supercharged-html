const { readFileSync } = require('fs');
const { parse } = require('node-html-parser');
const beautify = require("html-formatter");

const print = require('./print');
const writeFileSyncRecursive = require('./writeFileSyncRecursive');
const renderChildComponents = require('./renderChildComponents');

const pageDependencies = {}

const renderPage = ({ components, pageName, production = false }) => {
  const input = `./src/pages/${pageName}.html`;
  const output = `./dist/${pageName}.html`;

  const time = Date.now();
  print({ type: 'info', content: `Compiling - pages/${pageName}` });

  const pageContent = readFileSync(input).toString('utf-8');
  const pageElement = parse(pageContent);

  pageDependencies[input] = renderChildComponents(components, pageElement);

  const beautifiedContent = production ? beautify.render(pageElement.toString()) : pageElement.toString();

  writeFileSyncRecursive(
    output,
    beautifiedContent,
    'utf-8'
  );

  print({ type: 'success', content: `Compiled - pages/${pageName} (${Date.now() - time}ms)` });
}

module.exports = { pageDependencies, renderPage }