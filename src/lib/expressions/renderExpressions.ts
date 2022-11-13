import { HTMLElement } from 'node-html-parser';

import { Prop } from '../props/getProps';
import getValueOfExpression from './getValueOfExpression';

interface Params {
  element: HTMLElement
  props: Prop[]
}

const renderExpressions = (params: Params) => {
  let { innerHTML } = params.element;

  const expressions = innerHTML.match(/{{(.*?)}}/g)
    ?.map((val) => val.replace(/{{\s*|\s*}}/g, '')) || [];

  expressions.forEach((expression) => {
    const value = getValueOfExpression(expression, params.props);

    const regex = new RegExp(`{{\\s*${expression}\\s*}}`, 'g');

    innerHTML = innerHTML.replace(regex, value);
  });

  params.element.innerHTML = innerHTML;
};

export default renderExpressions;
