/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airlines controller file.
 *
 *  Controller for processing airlines entity requests
 *
 */

import {JsonController, Get} from "routing-controllers";

import {AirlinesMdl} from "../models/AirlinesMdl.ts";

@JsonController()
export class AirlinesCtrl {
    private airlinesMdl: AirlinesMdl;

    constructor() {
        this.airlinesMdl = new AirlinesMdl();
    }

    @Get("/airlines")
    public getAll() {
        return this.airlinesMdl.getAll();
    }
}