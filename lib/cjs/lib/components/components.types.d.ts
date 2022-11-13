import { Attributes } from 'node-html-parser/dist/nodes/html';
export interface Component {
    tag: string;
    render: (attributes: Attributes) => string;
}
