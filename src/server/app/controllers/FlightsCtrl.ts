/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Flights controller file.
 *
 *  Controller for processing flights entity requests
 *
 */

import {Request} from "express";
import {JsonController, Get, Req, Param} from "routing-controllers";

import {FlightsMdl} from "../models/FlightsMdl.ts";

@JsonController()
export class FlightsCtrl {
    private flightsMdl: FlightsMdl;

    constructor() {
        this.flightsMdl = new FlightsMdl();
    }

    @Get("/flights_search/:airline_code")
    public getAllByAirlineCode(@Req() request: Request,
                               @Param("airline_code") airlineCode: string) {
        return this.flightsMdl.getAllByAirlineCode({
                airlineCode,
                date: request.query && (request.query.date || ""),
                locationFrom: request.query && (request.query.from || ""),
                locationTo: request.query && (request.query.to || "")
            });
    }

}