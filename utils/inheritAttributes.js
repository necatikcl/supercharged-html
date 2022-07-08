const { parse } = require('node-html-parser');
const print = require('./print')

const inheritAttributes = (child, element) => {
  const attrs = { ...element.attributes };

  const editableComponent = parse('<div>' + child.toString() + '</div>');

  Object.entries(attrs).forEach(([key, value]) => {
    const el = editableComponent.firstChild.firstChild;

    if (!el) {
      print({
        type: 'error',
        content: 'Components must have a root element. (' + key + '.html)'
      });
      return;
    }

    editableComponent.firstChild.firstChild.setAttribute(key, value)
  })

  return editableComponent.firstChild.firstChild
}

module.exports = inheritAttributes