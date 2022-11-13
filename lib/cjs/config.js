"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = void 0;
const DEFAULT_CONFIG = {
    srcDir: 'src',
    outputDir: 'dist',
    componentsDir: 'components',
    pagesDir: 'pages',
};
let config = DEFAULT_CONFIG;
const setConfig = (value) => {
    config = { ...DEFAULT_CONFIG, ...value };
};
exports.setConfig = setConfig;
const getConfig = () => config;
exports.getConfig = getConfig;
