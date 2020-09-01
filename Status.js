"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
/**
 * Class used to return connection status
 */
class Status {
    /**
     * Instance a new state
     * @param code Return code (http code)
     * @param result Connection result
     */
    constructor(code, result) {
        this.code = code;
        this.result = result;
    }
    /**
     * Transforms "this.result" in a valid return for the connection
     * If the type of "this.result" is object, the object's body will be returned.
     * If the type of "this.result" is string, an object similar to { "message": "this.result" }.
     * If "this.result" is difined, other than null and does not meet the options mentioned, the return will be { "result": "this.result" }.
     * If "this.result" is null or not defined, the result will return undefined.
     */
    toBody() {
        const type = typeof (this.result); //Type of result
        if (this.result !== undefined) {
            if (type === 'object' && this.result !== null) {
                return this.result;
            }
            else {
                return { [type === 'string' ? 'message' : "result"]: this.result };
            }
        }
        return undefined;
    }
    /**
     * Retrieves the object sent over the connection and makes it a valid object "State.result"
     * @param reqObj Object returned by connection
     */
    static parseStatusResult(reqObj) {
        if (reqObj) {
            if (typeof (reqObj.message) === 'string') {
                return reqObj.message;
            }
            else if (reqObj.result) {
                return reqObj.result;
            }
            return reqObj;
        }
        return undefined;
    }
}
exports.Status = Status;
