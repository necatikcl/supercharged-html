const checkPropsUsage = (htmlString, props) => {
  props.forEach((prop) => {
    if (prop.isUsed) return;

    const str = '{{ ' + prop.key + ' }}';

    if (htmlString.includes(str)) {
      prop.isUsed = true;
    }
  })
}

module.exports = checkPropsUsage;