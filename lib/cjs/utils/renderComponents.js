"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getComponents_1 = __importDefault(require("../lib/components/getComponents"));
const renderComponents = (props) => {
    const components = (0, getComponents_1.default)();
    if (components.length === 0)
        return props.element;
    components.forEach((component) => {
        const matches = props.element.querySelectorAll(`s-${component.tag}`);
        matches.forEach((match) => {
            const renderedComponent = component.render(match.attributes);
            console.log({ renderedComponent });
            match.replaceWith(renderedComponent);
        });
    });
    return false;
};
exports.default = renderComponents;
