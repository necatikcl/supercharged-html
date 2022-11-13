import { Attributes } from 'node-html-parser/dist/nodes/html';
import { HTMLElement } from 'node-html-parser';

interface Params {
  wrapper: HTMLElement,
  attributes?: Attributes,
}

export interface Prop {
  name: string,
  value: unknown,
  type: 'array' | 'object' | 'string' | 'number' | 'boolean',
}

const getProps = (params: Params): Prop[] => {
  // @ts-ignore
  const propDefsComment = params.wrapper.firstChild.firstChild as HTMLElement;

  if (propDefsComment.nodeType === 8) {
    const propDefsString = propDefsComment.rawText.replace('Props ', '');
    const propDefs = JSON.parse(propDefsString);

    return Object.entries(propDefs).map(([key, value]) => {
      const state: Prop = {} as Prop;

      if (typeof params.attributes?.[key] !== 'undefined') {
        state.value = params.attributes[key];
      } else {
        state.value = value;
      }

      state.type = typeof state.value as Prop['type'];
      state.name = key;

      return state;
    });
  }

  return [];
};

export default getProps;
