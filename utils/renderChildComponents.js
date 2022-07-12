const renderComponent = require('./renderComponent');

const renderChildComponents = (components, element) => {
  const dependencies = [];

  Object.keys(components).forEach(componentName => {
    const componentPlaceholders = element.querySelectorAll('s-' + componentName)

    if (componentPlaceholders.length > 0) {
      dependencies.push(componentName);
    }

    componentPlaceholders.forEach(componentPlaceholder => {
      const componentSource = components[componentName]();

      const newEl = renderComponent(componentPlaceholder, componentSource);

      if (newEl.toString().includes('<s-')) {
        renderChildComponents(components, newEl);
      }
    })
  })

  return dependencies;
}

module.exports = renderChildComponents;