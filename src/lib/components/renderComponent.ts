import { parse, HTMLElement } from 'node-html-parser';
import { Attributes } from 'node-html-parser/dist/nodes/html';
import renderExpressions from '../expressions/renderExpressions';

import getProps from '../props/getProps';
import renderChildComponents from './renderChildComponents';

interface Params {
  componentHTML: string,
  attributes: Attributes,
}

const renderComponent = (params: Params) => {
  const wrapper = parse(`<div>${params.componentHTML}</div>`, { comment: true });
  // @ts-ignore - As far as I can tell, this is a bug in the node-html-parser types.
  const element = wrapper.firstChild.lastChild as HTMLElement;
  const props = getProps({
    wrapper,
    attributes: params.attributes,
  });

  const attributes = Object.entries(params.attributes)
    .filter((attribute) => !props.find((item) => item.name === attribute[0]));

  console.log({ props });

  attributes.forEach(([key, value]) => {
    if (key === 'class') {
      const classes = value.split(' ');
      classes.forEach((item) => element.classList.add(item));
    } else {
      element.setAttribute(key, value);
    }
  });

  renderExpressions({ element, props });
  renderChildComponents({ element });

  return element.toString();
};

export default renderComponent;
