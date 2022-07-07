const { readdirSync, readFileSync } = require('fs');
const { parse } = require('node-html-parser');
const beautify = require("html-formatter");

const writeFileSyncRecursive = require('./utils/writeFileSyncRecursive');
const getComponents = require('./utils/getComponents')
const compileSlots = require('./utils/compileSlots')
const inheritAttributes = require('./utils/inheritAttributes');
const renderComponent = require('./utils/renderComponent')

const pageNames = readdirSync('./src/pages/');

const components = getComponents();

pageNames.forEach(pageName => {
  const INPUT_PATH = `./src/pages/${pageName}`;
  const OUTPUT_PATH = `./dist/pages/${pageName}`;

  const pageContent = readFileSync(INPUT_PATH).toString('utf-8');
  const pageElement = parse(pageContent);

  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = pageElement.querySelectorAll('s-' + componentName)

    componentPlaceholders.forEach(componentPlaceholder => {
      const componentSource = components[componentName]();

      renderComponent(componentPlaceholder, componentSource)
    })
  })

  writeFileSyncRecursive(
    OUTPUT_PATH,
    beautify.render(pageElement.toString()),
    'utf-8'
  );
})