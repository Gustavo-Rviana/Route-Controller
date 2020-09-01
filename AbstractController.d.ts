import { Request, Response, RequestHandler } from "express";
import { Requirement } from "./Requirement";
import { Options } from "./Options";
import { Status } from "./Status";
/**
 * Class responsible for processing route information.
 */
export declare abstract class AbstractController<T extends Options = Options> {
    private readonly _requirements;
    /**
     * Configure the controller
     * @param requirements Controller requirements
     */
    constructor(...requirements: Requirement[]);
    /**
     * Run the route with the requirements options
     * @param req Connection request
     * @param res Connection response
     * @param options Route options
     */
    abstract onRouteCalled(req: Request, res: Response, options: T): Promise<Status>;
    /**
     * Process an unhandled error
     * @param error Unhandled error
     * @param res Connection response
     */
    abstract onNoHandledError(error: Error, res: Response): void;
    /**
     * Get controller requirements
     */
    get requirements(): readonly Requirement[];
    /**
     * Transform the controller into middleware
     * @param handler Name of the handler to be executed. (The handler will start with the same settings as "onRouteCalled")
     */
    configure(handlerName?: string): RequestHandler;
}
/**
 * Send the object "status" as a response (if the object is null, a code 500 along with the message "Internal server error" will be sent to the connection)
 * @param res Connection response
 * @param status Status that must be sent to the connection (if it is a number, a status message will also be sent)
 * @param alertClosedConnection Sends to the terminal that an attempt was made to send a response to a terminated connection
 */
export declare function sendStatus(res: Response, status: Status | number, alertClosedConnection?: boolean): void;
