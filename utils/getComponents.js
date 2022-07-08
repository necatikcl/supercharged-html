const { parse } = require('node-html-parser');
const { readFileSync, readdirSync } = require('fs');
const renderComponent = require('./renderComponent');
const print = require('./print')

const renderComponents = (components, element) => {
  const dependencies = [];

  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = element.querySelectorAll('s-' + componentName.replace('.html', ''));

    if (componentPlaceholders.length > 0) {
      dependencies.push(componentName);
    }

    componentPlaceholders.forEach(componentPlaceholder => {
      const componentSource = components[componentName];

      renderComponent(componentPlaceholder, componentSource);
    })
  });

  return dependencies
}

const getComponents = () => {
  const componentNames = readdirSync('./src/components/');

  const components = {};
  const componentDependencies = {};

  componentNames.forEach(fileName => {
    const componentName = fileName.replace('.html', '');
    const buffer = readFileSync(`./src/components/${fileName}`);

    const content = buffer.toString();

    components[componentName] = parse(content);
  });

  Object.keys(components).forEach(componentName => {
    const component = components[componentName];

    componentDependencies[componentName] = renderComponents(components, component);
  })

  const componentsReworked = {};
  Object.entries(components).forEach(([key, value]) => {
    const html = value.toString();

    componentsReworked[key] = () => parse(html);
  })

  const rerenderComponent = (componentName) => {
    const time = Date.now();
    print({ type: 'info', content: `Rerendering - components/${componentName}` });

    const fileName = componentName + '.html'

    const buffer = readFileSync(`./src/components/${fileName}`);

    const content = buffer.toString();
    const component = parse(content);

    components[fileName] = component;
    componentDependencies[fileName] = renderComponents(components, component);

    const html = component.toString();

    componentsReworked[componentName] = () => parse(html)

    print({ type: 'success', content: `Rerendered - components/${componentName} (${Date.now() - time}ms)` });
  }

  return {
    components: componentsReworked,
    componentDependencies,
    rerenderComponent
  };
}

module.exports = getComponents