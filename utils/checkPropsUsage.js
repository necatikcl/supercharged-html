const checkPropsUsage = (htmlString, props) => {
  props.forEach((prop) => {
    if (prop.isUsed) return;

    if (htmlString.includes(prop.key)) {
      prop.isUsed = true;
    }
  })
}

module.exports = checkPropsUsage;