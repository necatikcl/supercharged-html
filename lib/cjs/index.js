"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_html_parser_1 = require("node-html-parser");
const config_1 = require("./config");
const renderChildComponents_1 = __importDefault(require("./lib/components/renderChildComponents"));
const getPageElement = () => {
    const config = (0, config_1.getConfig)();
    const pageContent = fs_1.default.readFileSync(`${config.srcDir}/${config.pagesDir}/index.html`, 'utf-8');
    return (0, node_html_parser_1.parse)(pageContent);
};
const renderPage = (config) => {
    (0, config_1.setConfig)(config);
    const pageElement = getPageElement();
    (0, renderChildComponents_1.default)({ element: pageElement });
    fs_1.default.writeFileSync(`${config.outputDir}/index.html`, pageElement.toString());
};
exports.default = renderPage;
