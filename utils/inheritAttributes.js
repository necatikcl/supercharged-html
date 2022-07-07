const { parse } = require('node-html-parser');

const inheritAttributes = (child, element) => {
  const attrs = { ...element.attributes };

  const editableComponent = parse('<div>' + child.toString() + '</div>');

  Object.entries(attrs).forEach(([key, value]) => {
    editableComponent.firstChild.firstChild.setAttribute(key, value)
  })

  return editableComponent.firstChild.firstChild
}

module.exports = inheritAttributes