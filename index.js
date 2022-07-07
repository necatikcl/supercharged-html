const { readdirSync, readFileSync, rmSync, watchFile } = require('fs');
const { parse } = require('node-html-parser');
const beautify = require("html-formatter");

const print = require('./utils/print');
const writeFileSyncRecursive = require('./utils/writeFileSyncRecursive');
const getComponents = require('./utils/getComponents')
const renderComponent = require('./utils/renderComponent');

const compileHTML = ({ components, input, output }) => {
  const time = Date.now();
  print({ type: 'info', content: `Compiling ${input}` });

  const pageContent = readFileSync(input).toString('utf-8');
  const pageElement = parse(pageContent);

  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = pageElement.querySelectorAll('s-' + componentName)

    componentPlaceholders.forEach(componentPlaceholder => {
      const componentSource = components[componentName]();

      renderComponent(componentPlaceholder, componentSource)
    })
  })

  writeFileSyncRecursive(
    output,
    beautify.render(pageElement.toString()),
    'utf-8'
  );

  print({ type: 'success', content: `Compiled ${input} (${Date.now() - time}ms)` });
}

const superHTML = ({ production = false }) => {
  rmSync('./dist', { recursive: true, force: true });

  const pageNames = readdirSync('./src/pages/');

  const components = getComponents();

  pageNames.forEach(pageName => {
    const input = `./src/pages/${pageName}`;
    const output = `./dist/${pageName}`;

    compileHTML({ components, input, output });

    if (!production) {
      watchFile(input, () => compileHTML({ components, input, output }))
    }
  })
}

module.exports = superHTML