/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airports model file.
 *
 *  Model for airports entity
 *
 */

import axios, {AxiosResponse, AxiosError} from "axios";
import {InternalServerError, BadRequestError} from "routing-controllers";

import {config} from "../config";

export class AirportsMdl {
    private validate(query: string): void {
        if (!query) {
            throw new BadRequestError("Bad 'q' param");
        }
    }

    public getAllByQuery(query: string): Promise<any> {
        this.validate(query);

        return axios.get(config.endpoints.airports.getAllByQuery, {
                params: {
                    q: query
                }
            })
            .then((response: AxiosResponse) => {
                return Promise.resolve(response.data || []);
            })
            .catch((err: AxiosError) => {
                throw new InternalServerError(err.response && err.response.data);
            });

    }
}