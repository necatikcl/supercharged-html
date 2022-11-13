import { Prop } from '../props/getProps';

const getValueOfExpression = (code: string, props: Prop[]) => {
  let propsString = '';

  props.forEach((prop) => {
    const value = prop.type === 'string' ? `"${prop.value}"` : prop.value;
    propsString += `var ${prop.name} = ${value};`;
  });

  // eslint-disable-next-line no-new-func
  return new Function(`${propsString}; var result = (${code}); return result;`)();
};

export default getValueOfExpression;
