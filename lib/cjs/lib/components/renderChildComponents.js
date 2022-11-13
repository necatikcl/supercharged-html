"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getComponents_1 = __importDefault(require("./getComponents"));
const renderChildComponents = (params) => {
    const components = (0, getComponents_1.default)();
    if (components.length === 0)
        return;
    components.forEach((component) => {
        const matches = params.element.querySelectorAll(`s-${component.tag}`);
        matches.forEach((match) => {
            const renderedComponent = component.render(match.attributes);
            match.replaceWith(renderedComponent);
        });
    });
};
exports.default = renderChildComponents;
