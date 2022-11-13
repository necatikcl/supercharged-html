"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProps = (params) => {
    // @ts-ignore
    const propDefsComment = params.wrapper.firstChild.firstChild;
    if (propDefsComment.nodeType === 8) {
        const propDefsString = propDefsComment.rawText.replace('Props ', '');
        const propDefs = JSON.parse(propDefsString);
        return Object.entries(propDefs).map(([key, value]) => {
            const state = {};
            if (typeof params.attributes?.[key] !== 'undefined') {
                state.value = params.attributes[key];
                delete params.attributes;
            }
            else {
                state.value = value;
            }
            state.type = typeof state.value;
            state.name = key;
            return state;
        });
    }
    return [];
};
exports.default = getProps;
