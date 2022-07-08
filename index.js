const { readdirSync, readFileSync, rmSync, watchFile, watch } = require('fs');
const { parse } = require('node-html-parser');
const beautify = require("html-formatter");
var chokidar = require('chokidar');

const print = require('./utils/print');
const writeFileSyncRecursive = require('./utils/writeFileSyncRecursive');
const getComponents = require('./utils/getComponents')
const renderComponent = require('./utils/renderComponent');

const pageDependencies = {}

const compileHTML = ({ components, pageName }) => {
  const input = `./src/pages/${pageName}.html`;
  const output = `./dist/${pageName}.html`;

  const time = Date.now();
  print({ type: 'info', content: `Compiling - pages/${pageName}` });

  const pageContent = readFileSync(input).toString('utf-8');
  const pageElement = parse(pageContent);

  pageDependencies[input] = [];

  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = pageElement.querySelectorAll('s-' + componentName)

    if (componentPlaceholders.length > 0) {
      pageDependencies[input].push(componentName);
    }

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

  print({ type: 'success', content: `Compiled - pages/${pageName} (${Date.now() - time}ms)` });
}

const superHTML = ({ production = false }) => {
  rmSync('./dist', { recursive: true, force: true });

  const pageNames = readdirSync('./src/pages/');

  const { components, componentDependencies, rerenderComponent } = getComponents({ production });

  pageNames.forEach(fileName => {
    const pageName = fileName.replace('.html', '');

    compileHTML({ components, pageName });

    if (!production) {
      const pageWatcher = chokidar.watch(`./src/pages/${fileName}`);

      pageWatcher.on('change', () => compileHTML({ components, pageName }));
      pageWatcher.on('unlink', () => rmSync(`./dist/${fileName}`, { recursive: true, force: true }));
    }
  });

  const componentsWatcher = chokidar.watch('./src/components/**');

  componentsWatcher.on('change', (path) => {
    const componentsChanged = [];

    const checkDependencies = (componentName) => {
      const componentsDependingOnThis = [];

      Object.entries(componentDependencies).forEach(([key, dependencies]) => {
        if (dependencies.includes(componentName)) {
          componentsDependingOnThis.push(key);
        }
      })

      componentsChanged.push(componentName)
      rerenderComponent(componentName);

      if (componentsDependingOnThis?.length > 0) {
        componentsDependingOnThis.forEach(dependency => checkDependencies(dependency));
      }
    }

    const componentName = path
      .replace('src/components/', '')
      .replace('.html', '');

    checkDependencies(componentName);

    Object.entries(pageDependencies).forEach(([path, dependencies]) => {
      if (componentsChanged.some(dependency => dependencies.includes(dependency))) {
        compileHTML({ components, pageName: path.replace('./src/pages/', '').replace('.html', '') });
      }
    })
  });
}

module.exports = superHTML