const evalWithProps = require('./evalWithProps');
const print = require('./print');

const checkConditionsRecursively = (element, props) => {
  const conditionExpression = element.getAttribute('s-if') || element.getAttribute('s-else-if');
  const nextElement = element.nextElementSibling;

  if (!conditionExpression) {
    print({
      type: 'error',
      content: 'Do not use empty s-if attributes'
    })

    return;
  };

  const condition = evalWithProps(conditionExpression, props);
  if (!condition) {
    element.remove();

    if (nextElement?.hasAttribute('s-else-if')) {
      checkConditionsRecursively(nextElement, props);
    }

    if (nextElement?.hasAttribute('s-else')) {
      nextElement.removeAttribute('s-else');
    }
  } else {
    element.removeAttribute('s-if');
  }
}

const removeConditionalElements = ({ componentSource, props }) => {
  const conditionalElements = componentSource.querySelectorAll('[s-if]');

  conditionalElements.forEach((el) => checkConditionsRecursively(el, props))
}

module.exports = removeConditionalElements