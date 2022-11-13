"use strict";
const { parse } = require('node-html-parser');
const print = require('./print');
const inheritAttributes = ({ componentSource, props }) => {
    const stringContent = componentSource.toString();
    const attrs = props.filter((prop) => !prop.isUsed);
    const editableComponent = parse(`<div>${stringContent}</div>`, { comment: true });
    const el = editableComponent.firstChild.lastChild;
    attrs.forEach((attr) => {
        if (attr.key === 'class') {
            attr.value.forEach((className) => {
                el.classList.add(className);
            });
            el.classList.remove('');
        }
        else {
            el.setAttribute(attr.key, attr.value);
        }
    });
    const attrClass = attrs.find((attr) => attr.key === 'class');
    if (!attrClass) {
        return el;
    }
    const classNames = attrs.class ? attrs.class.split(' ') : [];
    delete attrs.class;
    if (!el) {
        print({
            type: 'error',
            content: `Components must have a root element. (${key}.html)`,
        });
        return;
    }
    classNames.forEach((className) => {
        el.classList.add(className);
    });
    return editableComponent.firstChild.lastChild;
};
module.exports = inheritAttributes;
