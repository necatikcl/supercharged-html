import { HTMLElement } from 'node-html-parser';
import { Prop } from '../props/getProps';
interface Params {
    element: HTMLElement;
    props: Prop[];
}
declare const renderExpressions: (params: Params) => void;
export default renderExpressions;
