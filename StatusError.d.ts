import { Status } from ".";
/**
 * State-based error class
 */
export declare class StatusError extends Error {
    /**
     * Error code
     */
    readonly code: number;
    /**
     * Initializes the error class
     * @param code Error code
     * @param message Error message
     */
    constructor(code: number, message?: string);
    /**
     * Converts the error to state
     */
    toStatus(): Status<string>;
}
