/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airlines model file.
 *
 *  Model for airlines entity
 *
 */

import axios, {AxiosResponse, AxiosError} from "axios";
import {InternalServerError} from "routing-controllers";

import {config} from "../config";

export class AirlinesMdl {
    public airlines: Object[] = [];

    public getAll(): Promise<any> {
        if (this.airlines.length) {
            return Promise.resolve(this.airlines);
        }

        return axios.get(config.endpoints.airlines.getAll, {})
            .then((response: AxiosResponse) => {
                if (!response || !response.data) {
                    return Promise.reject("Response obj is empty");
                }

                this.airlines = response.data;
                return Promise.resolve(this.airlines);
            })
            .catch((err: AxiosError | string) => {
                throw new InternalServerError(
                    typeof err !== "string"
                    ? err.response && err.response.data
                    : err
                );
            });
    }
}