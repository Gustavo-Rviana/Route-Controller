import { Request, Response } from "express";
import { Options } from "body-parser";
import { Status } from ".";
export interface Requirement {
    /**
     * Load route requirements and options
     * @param req Connection request
     * @param res Conection respose
     * @param options Route options
     */
    load(req: Request, res: Response, options: Options): Promise<boolean>;
    /**
     * Recover the error message
     * @param options Route options
     */
    getError(options: Options): Status;
}
