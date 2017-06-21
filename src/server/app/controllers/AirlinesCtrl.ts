/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airlines controller file.
 *
 *  Controller for processing airlines entity requests
 *
 */

import {Request, Response} from "express";
import {JsonController, Get, Res, Req} from "routing-controllers";

import {AirlinesMdl} from "../models/AirlinesMdl.ts";

@JsonController()
export class AirlinesCtrl {
    private airlinesMdl: AirlinesMdl;

    constructor() {
        this.airlinesMdl = new AirlinesMdl();
    }

    @Get("/airlines")
    public getAll(@Req() request: Request,
                  @Res() response: Response) {
        return this.airlinesMdl.getAll()
            .then(() => {
                response.send(this.airlinesMdl.airlines);
            });
    }
}