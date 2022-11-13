"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const getComponentsDir_1 = __importDefault(require("./getComponentsDir"));
const renderComponent_1 = __importDefault(require("./renderComponent"));
const fetchComponents = () => {
    const componentsDir = (0, getComponentsDir_1.default)();
    const componentFilePaths = fs_1.default.readdirSync(componentsDir);
    const components = [];
    componentFilePaths.forEach((componentFilePath) => {
        const componentFile = fs_1.default.readFileSync(`${componentsDir}/${componentFilePath}`, 'utf-8');
        const componentName = componentFilePath.replace('.html', '');
        components.push({
            tag: componentName,
            render: (attributes) => (0, renderComponent_1.default)({
                componentHTML: componentFile,
                attributes,
            }),
        });
    });
    return components;
};
exports.default = fetchComponents;
