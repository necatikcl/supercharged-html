"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getValueOfExpression_1 = __importDefault(require("./getValueOfExpression"));
const renderExpressions = (params) => {
    let { innerHTML } = params.element;
    const expressions = innerHTML.match(/{{(.*?)}}/g)
        ?.map((val) => val.replace(/{{\s*|\s*}}/g, '')) || [];
    expressions.forEach((expression) => {
        const value = (0, getValueOfExpression_1.default)(expression, params.props);
        const regex = new RegExp(`{{\\s*${expression}\\s*}}`, 'g');
        innerHTML = innerHTML.replace(regex, value);
    });
    params.element.innerHTML = innerHTML;
};
exports.default = renderExpressions;
