const { parse } = require('node-html-parser');
const print = require('./print');

const inheritAttributes = ({ componentSource, props }) => {
  let stringContent = componentSource.toString();

  const attrs = props.filter(prop => !prop.isUsed);

  const editableComponent = parse('<div>' + stringContent + '</div>');
  const el = editableComponent.firstChild.firstChild;

  attrs.forEach((attr) => {
    if (attr.key === 'class') {
      attr.value.forEach(className => {
        el.classList.add(className)
      })
    } else {
      el.setAttribute(attr.key, attr.value)
    }
  })

  const attrClass = attrs.find(attr => attr.key === 'class');


  if (!attrClass) {
    return el;
  }

  const classNames = attrs.class ? attrs.class.split(' ') : [];
  delete attrs.class;


  if (!el) {
    print({
      type: 'error',
      content: 'Components must have a root element. (' + key + '.html)'
    });
    return;
  }



  classNames.forEach(className => {
    el.classList.add(className)
  })

  return editableComponent.firstChild.firstChild
}

module.exports = inheritAttributes