/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airports controller file.
 *
 *  Controller for processing airports entity requests
 *
 */

import {Request, Response} from "express";
import {JsonController, Get, Res, Req} from "routing-controllers";

import {AirportsMdl} from "../models/AirportsMdl.ts";

@JsonController()
export class AirportsCtrl {
    private airportsMdl: AirportsMdl;

    constructor() {
        this.airportsMdl = new AirportsMdl();
    }

    @Get("/airports")
    public getAllByQuery(@Req() request: Request,
                         @Res() response: Response) {
        return this.airportsMdl.getAllByQuery(request.query.q || "")
            .then((airports) => {
                response.send(airports);
            });
    }

}