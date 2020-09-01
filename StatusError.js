"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusError = void 0;
const _1 = require(".");
/**
 * State-based error class
 */
class StatusError extends Error {
    /**
     * Initializes the error class
     * @param code Error code
     * @param message Error message
     */
    constructor(code, message) {
        super(message);
        this.code = code;
    }
    /**
     * Converts the error to state
     */
    toStatus() {
        return new _1.Status(this.code, this.message);
    }
}
exports.StatusError = StatusError;
