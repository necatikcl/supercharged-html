const compileSlots = require('./compileSlots');
const inheritAttributes = require('./inheritAttributes');
const renderExpressions = require('./renderExpressions');
const { parse } = require('node-html-parser');
const checkPropsUsage = require('./checkPropsUsage');
const removeConditionalElements = require('./removeConditionalElements');
const compileProps = require('./compileProps');

const renderComponent = (componentPlaceholder, _componentSource) => {
  const props = compileProps(componentPlaceholder, _componentSource);

  const sourceStringRaw = _componentSource.toString();
  checkPropsUsage(sourceStringRaw, props);

  // {{ expression }}
  const sourceString = renderExpressions(sourceStringRaw, props);
  const componentSource = sourceStringRaw === sourceString ? _componentSource : parse(sourceString, { comment: true });

  // s-if, s-else
  removeConditionalElements({ componentSource, props });

  // <slot>
  compileSlots({ componentPlaceholder, componentSource });

  const newElement = inheritAttributes({ componentSource, props });
  componentPlaceholder.replaceWith(newElement);

  return newElement;
}

module.exports = renderComponent;