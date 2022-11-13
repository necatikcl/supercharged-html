"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_html_parser_1 = require("node-html-parser");
const renderExpressions_1 = __importDefault(require("../expressions/renderExpressions"));
const getProps_1 = __importDefault(require("../props/getProps"));
const renderChildComponents_1 = __importDefault(require("./renderChildComponents"));
const renderComponent = (params) => {
    const wrapper = (0, node_html_parser_1.parse)(`<div>${params.componentHTML}</div>`, { comment: true });
    // @ts-ignore - As far as I can tell, this is a bug in the node-html-parser types.
    const element = wrapper.firstChild.lastChild;
    const props = (0, getProps_1.default)({
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
        }
        else {
            element.setAttribute(key, value);
        }
    });
    (0, renderExpressions_1.default)({ element, props });
    (0, renderChildComponents_1.default)({ element });
    return element.toString();
};
exports.default = renderComponent;
