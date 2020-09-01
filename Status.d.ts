/**
 * Class used to return connection status
 */
export declare class Status<T = any> {
    /**
     * Connection status code
     */
    code: number;
    /**
     * Connection result
     */
    result: T;
    /**
     * Instance a new state
     * @param code Return code (http code)
     * @param result Connection result
     */
    constructor(code: number, result?: T);
    /**
     * Transforms "this.result" in a valid return for the connection
     * If the type of "this.result" is object, the object's body will be returned.
     * If the type of "this.result" is string, an object similar to { "message": "this.result" }.
     * If "this.result" is difined, other than null and does not meet the options mentioned, the return will be { "result": "this.result" }.
     * If "this.result" is null or not defined, the result will return undefined.
     */
    toBody(): object;
    /**
     * Retrieves the object sent over the connection and makes it a valid object "State.result"
     * @param reqObj Object returned by connection
     */
    static parseStatusResult(reqObj: any): any;
}
