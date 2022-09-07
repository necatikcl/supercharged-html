const getDefaultProps = (element) => {
  const matches = element.innerHTML.match(/(<!-- Props)(.+?)(-->)/s);
  if (!matches || matches.length === 0) return [];

  const propsString = matches[0].replace('<!-- Props ', '').replace(' -->', '')
  
  var jsonStr = propsString.replace(/(\w+:)|(\w+ :)/g, function(s) {
    return '"' + s.substring(0, s.length-1) + '":';
  }).replace(/'/g, '"');
  
  var defaultPropsValues = Object.entries(JSON.parse(jsonStr)).map(([key, value]) => ({ key, value }));

  return defaultPropsValues.map(item => ({
    key: item.key,
    value: item.value,
    type: typeof item.value,
    isUsed: true
  }))
}
const compileProps = (element, sourceElement) => {
  const props = getDefaultProps(sourceElement);

  const attributes = Object.entries(element.attributes).map(([key, val]) => {
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
      isUsed: !!props.find(item => item.key === key)
    };
  })

  const arr =  [...attributes, ...props];
  return arr.filter((item, index) => arr.findIndex(i => i.key === item.key) === index);
};

module.exports = compileProps;