const { readdirSync, readFileSync, rmSync } = require('fs');
const { parse } = require('node-html-parser');
const beautify = require("html-formatter");
var chokidar = require('chokidar');

const print = require('./utils/print');
const writeFileSyncRecursive = require('./utils/writeFileSyncRecursive');
const getComponents = require('./utils/getComponents')
const renderChildComponents = require('./utils/renderChildComponents');

const pageDependencies = {}

const compileHTML = ({ components, pageName, production = false }) => {
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

const superHTML = ({ production = false }) => {
  rmSync('./dist', { recursive: true, force: true });

  const pageNames = readdirSync('./src/pages/');

  const { components, componentDependencies, rerenderComponent } = getComponents({ production });

  pageNames.forEach(fileName => {
    const pageName = fileName.replace('.html', '');

    compileHTML({ components, pageName, production });

    if (!production) {
      const pageWatcher = chokidar.watch(`./src/pages/${fileName}`);

      pageWatcher.on('change', () => compileHTML({ components, pageName }));
      pageWatcher.on('unlink', () => rmSync(`./dist/${fileName}`, { recursive: true, force: true }));
    }
  });

  if (production) return;

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