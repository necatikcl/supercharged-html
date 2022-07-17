const compileSlots = require('./compileSlots')
const inheritAttributes = require('./inheritAttributes');

const removeConditionalElements = (componentPlaceholder, componentSource) => {
  const conditionalElements = componentSource.querySelectorAll('[s-if]');

  conditionalElements.forEach(conditionalElement => {
    const nextElement = conditionalElement.nextElementSibling;
    const conditionalVariable = conditionalElement.getAttribute('s-if');
    const placeholderAttr = componentPlaceholder.getAttribute(conditionalVariable);

    if (!conditionalVariable) return;

    componentPlaceholder.removeAttribute(conditionalVariable);

    if (placeholderAttr === undefined || placeholderAttr === "false") {
      conditionalElement.remove();

      if (nextElement.hasAttribute('s-else')) {
        nextElement.removeAttribute('s-else');
      }
    } else {
      conditionalElement.removeAttribute('s-if');

      if (nextElement.hasAttribute('s-else')) {
        nextElement.remove()
      }
    }
  }
  )
}

const renderComponent = (componentPlaceholder, componentSource) => {
  removeConditionalElements(componentPlaceholder, componentSource);
  compileSlots(componentPlaceholder, componentSource);

  const newElement = inheritAttributes(componentSource, componentPlaceholder);
  componentPlaceholder.replaceWith(newElement);

  return newElement;
}

module.exports = renderComponent;