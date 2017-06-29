/**
 *
 *  FLIGHT SERACH INTERFACE
 *  flights model file.
 *
 *  Model for flights entity
 *
 */

import axios, {AxiosResponse, AxiosError} from "axios";
import {InternalServerError, BadRequestError} from "routing-controllers";

import {config} from "../config";

interface GetAllByAirlineCodeParams {
    airlineCode: string;
    date: string;
    locationFrom: string;
    locationTo: string;
}

export class FlightsMdl {
    private validateParams(params: GetAllByAirlineCodeParams): void {
        if (!params.airlineCode) {
            throw new BadRequestError("Bad 'airlineCode' param");
        }

        if (!params.date || !/^\d{4}\-\d{2}\-\d{2}$/.test(params.date)) {
            throw new BadRequestError("Bad 'date' param");
        }

        if (!params.locationFrom || !/^[A-Z]{3}$/.test(params.locationFrom)) {
            throw new BadRequestError("Bad 'locationFrom' param");
        }

        if (!params.locationTo || !/^[A-Z]{3}$/.test(params.locationTo)) {
            throw new BadRequestError("Bad 'locationTo' param");
        }
    }

    public getAllByAirlineCode(params: GetAllByAirlineCodeParams): Promise<any> {
        this.validateParams(params);

        return axios.get(config.endpoints.flights.getAllByAirlineCode + params.airlineCode, {
                params: {
                    date: params.date,
                    from: params.locationFrom,
                    to:   params.locationTo
                }
            })
            .then((response: AxiosResponse) => {
                if (!response || !response.data) {
                    return Promise.reject("Response obj is empty");
                }

                return Promise.resolve(response.data);
            })
            .catch((err: AxiosError) => {
                throw new InternalServerError(
                    typeof err !== "string"
                        ? err.response && err.response.data
                        : err
                );
            });
    }
}