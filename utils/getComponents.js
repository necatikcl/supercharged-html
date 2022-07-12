const { parse } = require('node-html-parser');
const { readFileSync, readdirSync } = require('fs');
const print = require('./print')

const trackDependencies = (components, element) => {
  const content = element.innerHTML
  const dependencies = [];

  Object.entries(components).forEach(([componentName, componentSource]) => {
    const regex = new RegExp("s-" + componentName + "( |>)", "gm")
    if (content.match(regex)) {
      dependencies.push(componentName);
    }
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

    componentDependencies[componentName] = trackDependencies(components, component);
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

    components[componentName] = component;
    componentDependencies[componentName] = trackDependencies(components, component);

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