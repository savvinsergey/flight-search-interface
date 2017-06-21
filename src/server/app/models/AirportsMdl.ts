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

export class AirportsMdl {
    public getAllByQuery(query: string) {
        if (!query) {
            throw new BadRequestError("Bad 'q' param");
        }

        return new Promise((resolve, reject) => {
            axios.get("http://node.locomote.com/code-task/airports", {
                    params: {
                        q: query
                    }
                })
                .then((response: AxiosResponse) => {
                    resolve({
                        query,
                        airports: response.data || []
                    });
                })
                .catch((err: AxiosError) => {
                    reject(err.response && err.response.data);
                });
        });
    }
}