import { Attributes } from 'node-html-parser/dist/nodes/html';
interface Params {
    componentHTML: string;
    attributes: Attributes;
}
declare const renderComponent: (params: Params) => string;
export default renderComponent;
