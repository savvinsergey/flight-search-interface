/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airports controller file.
 *
 *  Controller for processing airports entity requests
 *
 */

import {Request} from "express";
import {JsonController, Get, Req} from "routing-controllers";

import {AirportsMdl} from "../models/AirportsMdl.ts";

@JsonController()
export class AirportsCtrl {
    private airportsMdl: AirportsMdl;

    constructor() {
        this.airportsMdl = new AirportsMdl();
    }

    @Get("/airports")
    public getAllByQuery(@Req() request: Request) {
        return this.airportsMdl.getAllByQuery(request.query && (request.query.q || ""));
    }

}