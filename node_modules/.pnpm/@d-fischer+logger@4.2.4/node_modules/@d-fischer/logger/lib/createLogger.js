"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
var detect_node_1 = require("@d-fischer/detect-node");
var BrowserLogger_1 = require("./BrowserLogger");
var CustomLoggerWrapper_1 = require("./CustomLoggerWrapper");
var NodeLogger_1 = require("./NodeLogger");
function createLogger(options) {
    if (options.custom) {
        return new CustomLoggerWrapper_1.CustomLoggerWrapper(options);
    }
    if (detect_node_1.isNode) {
        return new NodeLogger_1.NodeLogger(options);
    }
    return new BrowserLogger_1.BrowserLogger(options);
}
exports.createLogger = createLogger;
