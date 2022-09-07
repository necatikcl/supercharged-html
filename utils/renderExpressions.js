const evalWithProps = require('./evalWithProps')
const checkPropsUsage = require('./checkPropsUsage')

const renderExpressions = (htmlString, props) => {
  const expressions = htmlString.match(/{{(.*?)}}/g)
    ?.map((val) => val.replace(/{{\s*|\s*}}/g, '')) || [];

  checkPropsUsage(htmlString, props);

  expressions.forEach(expression => {
    const expressionValue = evalWithProps(expression, props);

    htmlString = htmlString.replace(`{{ ${expression} }}`, expressionValue);
  })

  return htmlString;
}

module.exports = renderExpressions;