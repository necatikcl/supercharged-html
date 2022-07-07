const { parse } = require('node-html-parser');
const { readFileSync, readdirSync } = require('fs');
const renderComponent = require('./renderComponent');

const renderComponents = (components, element) => {
  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = element.querySelectorAll('s-' + componentName);

    componentPlaceholders.forEach(componentPlaceholder => {
      const componentSource = components[componentName];

      renderComponent(componentPlaceholder, componentSource);
    })
  })
}

const getComponents = () => {
  const componentNames = readdirSync('./src/components/');

  const components = {};

  componentNames.forEach(componentName => {
    const buffer = readFileSync(`./src/components/${componentName}`);
    const content = buffer.toString();

    components[componentName.replace('.html', '')] = parse(content);
  });

  Object.keys(components).forEach(componentName => {
    const component = components[componentName];

    renderComponents(components, component)
  })

  const componentsReworked = {};
  Object.entries(components).forEach(([key, value]) => {
    const html = value.toString();

    componentsReworked[key] = () => parse(html);
  })

  return componentsReworked;
}

module.exports = getComponents