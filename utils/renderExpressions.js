const evalWithProps = require('./evalWithProps')
const checkPropsUsage = require('./checkPropsUsage')

const renderExpressions = (htmlString, props) => {
  const expressions = htmlString.match(/{{(.*?)}}/g)
    ?.map((val) => val.replace(/{{\s*|\s*}}/g, ''));

  if (!expressions) return htmlString;

  checkPropsUsage(htmlString, props);

  expressions.forEach(expression => {
    if (!props.find(item => item.key === expression)) {
      props.push({ key: expression, value: undefined, type: undefined, isUsed: true });
    }

    const expressionValue = evalWithProps(expression, props);

    htmlString = htmlString.replace(`{{ ${expression} }}`, expressionValue);
  })

  return htmlString;
}

module.exports = renderExpressions;