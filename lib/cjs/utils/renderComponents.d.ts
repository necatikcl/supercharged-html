import { HTMLElement } from 'node-html-parser';
interface Props {
    element: HTMLElement;
}
declare const renderComponents: (props: Props) => false | HTMLElement;
export default renderComponents;
