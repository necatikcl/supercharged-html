const { parse } = require('node-html-parser');
const print = require('./print')

const compileSlots = ({ componentPlaceholder, componentSource }) => {
  const slots = componentSource.querySelectorAll('slot');
  const templates = [...componentPlaceholder.querySelectorAll('template')]
  const slotElements = {}

  slots.forEach(slot => {
    const name = slot.getAttribute('name');

    if (!name) {
      slotElements['default'] = { slot };
      return;
    };

    const template = templates.find(
      item => item.getAttribute('name') === name
        || item.rawAttrs.includes(`#${name}`)
    );

    if (!template) {
      slot.remove();
      return;
    };

    slotElements[name] = {
      slot,
      content: template.innerHTML
    };

    template.remove();
  })

  if (slotElements['default']) {
    slotElements.default.slot.replaceWith(parse(componentPlaceholder.innerHTML, { comment: true }));

    delete slotElements.default;
  }

  Object.entries(slotElements).forEach(([name, value]) => {
    value.slot.replaceWith(parse(value.content, { comment: true }))
  })
}

module.exports = compileSlots