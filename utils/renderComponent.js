const compileSlots = require('./compileSlots')
const inheritAttributes = require('./inheritAttributes')

const renderComponent = (componentPlaceholder, componentSource) => {
  compileSlots(componentPlaceholder, componentSource)

  componentPlaceholder.replaceWith(
    inheritAttributes(componentSource, componentPlaceholder)
  );
}

module.exports = renderComponent;