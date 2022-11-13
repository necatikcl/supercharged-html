import { Attributes } from 'node-html-parser/dist/nodes/html';
import { HTMLElement } from 'node-html-parser';
interface Params {
    wrapper: HTMLElement;
    attributes?: Attributes;
}
interface Prop {
    name: string;
    value: unknown;
    type: 'array' | 'object' | 'string' | 'number' | 'boolean';
}
declare const getProps: (params: Params) => Prop[];
export default getProps;
