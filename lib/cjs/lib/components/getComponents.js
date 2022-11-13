"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetchComponents_1 = __importDefault(require("./fetchComponents"));
let cache = null;
const getComponents = () => {
    if (cache)
        return cache;
    cache = (0, fetchComponents_1.default)();
    return cache;
};
exports.default = getComponents;
