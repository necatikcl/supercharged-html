"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const getComponentsDir = () => {
    const config = (0, config_1.getConfig)();
    return `${config.srcDir}/${config.componentsDir}`;
};
exports.default = getComponentsDir;
