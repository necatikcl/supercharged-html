import { Attributes } from 'node-html-parser/dist/nodes/html';

export interface Component {
  tag: string,
  // eslint-disable-next-line no-unused-vars
  render: (attributes: Attributes) => string
}
