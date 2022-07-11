const { parse } = require('node-html-parser');
const print = require('./print')

const inheritAttributes = (child, element) => {
  const attrs = { ...element.attributes };

  const classNames = attrs.class ? attrs.class.split(' ') : [];
  delete attrs.class;

  let stringContent = child.toString();

  Object.entries(attrs).forEach(([key, value]) => {
    const regex = new RegExp("{{\\s*" + key + "\\s*}}", 'gm');
    let replacedContent = stringContent.replace(regex, value);

    if (replacedContent !== stringContent) {
      stringContent = replacedContent
      delete attrs[key];
    }
  })

  const editableComponent = parse('<div>' + stringContent + '</div>');
  const el = editableComponent.firstChild.firstChild;

  if (!el) {
    print({
      type: 'error',
      content: 'Components must have a root element. (' + key + '.html)'
    });
    return;
  }

  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })

  classNames.forEach(className => {
    el.classList.add(className)
  })

  return editableComponent.firstChild.firstChild
}

module.exports = inheritAttributes