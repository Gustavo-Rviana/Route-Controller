"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStatus = exports.AbstractController = void 0;
const StatusError_1 = require("./StatusError");
const Status_1 = require("./Status");
const statuses_1 = __importDefault(require("statuses"));
/**
 * Class responsible for processing route information.
 */
class AbstractController {
    /**
     * Configure the controller
     * @param requirements Controller requirements
     */
    constructor(...requirements) {
        this._requirements = requirements || [];
    }
    /**
     * Get controller requirements
     */
    get requirements() {
        return this._requirements;
    }
    /**
     * Transform the controller into middleware
     * @param handler Name of the handler to be executed. (The handler will start with the same settings as "onRouteCalled")
     */
    configure(handlerName) {
        //If "handlerName" is null, retrieves the name of "this.onRouteCalled"
        if (!handlerName)
            handlerName = this.onRouteCalled.name;
        //Throws an error if no handler is found
        if (!this[handlerName]) {
            throw new Error(`The handler "${handlerName}" does not exist in the controller "${Object.getPrototypeOf(this).constructor.name}".`);
        }
        //Retrieves the handler and links the function to the owner class
        const handler = this[handlerName].bind(this);
        //Return RequestHandler
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //Create route options
                let options = {};
                //Goes through all the requirements
                for (let i = 0; i < this._requirements.length; i++) {
                    const requirement = this._requirements[i];
                    //Checks whether the requisition owner has the necessary permission
                    if (!(yield requirement.load(req, res, options))) {
                        //if not, it returns the error that the application made available
                        sendStatus(res, requirement.getError(options));
                        return;
                    }
                }
                //If not, it returns the error that the application made available
                sendStatus(res, yield handler(req, res, options), false);
            }
            catch (error) {
                //If the error thrown is a StatusError
                if (error instanceof StatusError_1.StatusError) {
                    //Transforms the error into a state and sends it to the connection
                    sendStatus(res, error.toStatus());
                    return;
                }
                //If not a StatusError, invoke "onNoHandledError"
                this.onNoHandledError(error, res);
            }
        });
    }
}
exports.AbstractController = AbstractController;
/**
 * Send the object "status" as a response (if the object is null, a code 500 along with the message "Internal server error" will be sent to the connection)
 * @param res Connection response
 * @param status Status that must be sent to the connection (if it is a number, a status message will also be sent)
 * @param alertClosedConnection Sends to the terminal that an attempt was made to send a response to a terminated connection
 */
function sendStatus(res, status, alertClosedConnection = true) {
    if (res.finished && alertClosedConnection) {
        console.warn('NOTICE: An attempt was made to send a response to a closed connection!');
    }
    if (res.finished)
        return;
    if (typeof (status) === 'number' || !(status instanceof Status_1.Status)) {
        status = new Status_1.Status(status || 500, statuses_1.default[status || 500]);
    }
    //Send the state to connection
    res.status(status.code).json(status.toBody());
}
exports.sendStatus = sendStatus;
