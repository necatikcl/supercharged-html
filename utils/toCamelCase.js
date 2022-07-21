module.exports = (str) => {
  const strInPascalCase = str.replace(/(^\w|-\w)/g, (x) => x.replace(/-/, '').toUpperCase());

  return strInPascalCase.charAt(0).toLowerCase() + strInPascalCase.substring(1);
};
