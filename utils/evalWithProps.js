const toCamelCase = require('./toCamelCase');

function evalWithProps(code, props) {
  var propsString = "";

  props.forEach(prop => {
    if (prop.key === 'class') return;
    
    const value = prop.type === 'string' ? `"${prop.value}"` : prop.value
    propsString += "var " + toCamelCase(prop.key) + " = " + value + ";";
  })

  eval(propsString + "; var result = (" + code + ")");

  return result;
}

module.exports = evalWithProps