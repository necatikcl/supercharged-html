"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getValueOfExpression = (code, props) => {
    let propsString = '';
    props.forEach((prop) => {
        const value = prop.type === 'string' ? `"${prop.value}"` : prop.value;
        propsString += `var ${prop.name} = ${value};`;
    });
    // eslint-disable-next-line no-new-func
    return new Function(`${propsString}; var result = (${code}); return result;`)();
};
exports.default = getValueOfExpression;
