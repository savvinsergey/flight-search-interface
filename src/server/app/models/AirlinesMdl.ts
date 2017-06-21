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

export class AirlinesMdl {
    public airlines: Object[] = [];

    public getAll() {
        return new Promise((resolve, reject) => {
            if (this.airlines.length) {
                return resolve(true);
            }

            axios.get("http://node.locomote.com/code-task/airlines", {})
                .then((response: AxiosResponse) => {
                    if (response.data) {
                        this.airlines = response.data;
                    }

                    resolve(true);
                })
                .catch((err: AxiosError) => {
                    reject(err.response && err.response.data);
                });
        });
    }
}