/**
 *
 *  FLIGHT SERACH INTERFACE
 *  flights model file.
 *
 *  Model for flights entity
 *
 */

import axios, {AxiosResponse} from "axios";
import {InternalServerError, BadRequestError} from "routing-controllers";

interface GetAllByAirlineCodeParams {
    airlineCode: string;
    date: string;
    locationFrom: string;
    locationTo: string;
}

export class FlightsMdl {
    public getAllByAirlineCode(params: GetAllByAirlineCodeParams) {
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

        return new Promise((resolve, reject) => {
            axios.get("http://node.locomote.com/code-task/flight_search/" + params.airlineCode, {
                    params: {
                        date: params.date,
                        from: params.locationFrom,
                        to:   params.locationTo
                    }
                })
                .then((response: AxiosResponse) => {
                    resolve({
                        params,
                        flights: response.data || []
                    });
                })
                .catch((err) => {
                    throw new InternalServerError(err);
                });
        });
    }
}