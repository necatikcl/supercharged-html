const compileSlots = require('./compileSlots')
const inheritAttributes = require('./inheritAttributes');
const renderChildComponents = require('./renderChildComponents')

const renderComponent = (componentPlaceholder, componentSource) => {
  compileSlots(componentPlaceholder, componentSource);

  const newElement = inheritAttributes(componentSource, componentPlaceholder);
  componentPlaceholder.replaceWith(newElement);

  return newElement;
}

module.exports = renderComponent;