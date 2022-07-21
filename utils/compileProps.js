const compileProps = (element) => Object.entries(element.attributes).map(([key, val]) => {
  let value = val;
  let type = 'string';

  if (key === 'class') {
    type = 'array';

    if (!value) {
      value = [];
    } else {
      value = value.split(' ');
    }
  } else {
    if ([undefined, ''].includes(value)) {
      value = true;
      type = 'boolean'
    } else if (value === "false") {
      value = false;
      type = 'boolean'
    } else {
      const num = Number(value);
      if (Number(value) == value) {
        type = 'number'
        value = num;
      }
    }

  }

  return {
    key,
    value,
    type,
    isUsed: false
  };
});

module.exports = compileProps;