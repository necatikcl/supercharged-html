const { readdirSync, rmSync } = require('fs');
const chokidar = require('chokidar');

const { pageDependencies, renderPage } = require('./utils/renderPage')
const getComponents = require('./utils/getComponents')

const renderAllPages = ({ production = false }) => {
  rmSync('./dist', { recursive: true, force: true });

  const pageFileNames = readdirSync('./src/pages/');

  const { components, componentDependencies, rerenderComponent } = getComponents({ production });

  pageFileNames.forEach(fileName => {
    const pageName = fileName.replace('.html', '');

    renderPage({ components, pageName, production });

    if (!production) {
      const pageWatcher = chokidar.watch(`./src/pages/${fileName}`);

      pageWatcher.on('change', () => renderPage({ components, pageName }));
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
        renderPage({ components, pageName: path.replace('./src/pages/', '').replace('.html', '') });
      }
    })
  });
}

module.exports = renderAllPages