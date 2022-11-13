import { HTMLElement } from 'node-html-parser';

import getComponents from './getComponents';

interface Params {
  element: HTMLElement,
}

const renderChildComponents = (params: Params) => {
  const components = getComponents();

  if (components.length === 0) return;

  components.forEach((component) => {
    const matches = params.element.querySelectorAll(`s-${component.tag}`);

    matches.forEach((match) => {
      const renderedComponent = component.render(match.attributes);

      match.replaceWith(renderedComponent);
    });
  });
};

export default renderChildComponents;
