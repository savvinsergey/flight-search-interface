import axios, {AxiosResponse, AxiosError}  from "axios";

// ----------- Interfaces ------------

export interface IAirline {
    code: string;
    name: string;
}

// ----------- Model code ------------

export default class AirlinesModel {
    public static airlines: IAirline[];

    fetchAirlines(): Promise<any> {
        return axios.get('http://localhost:3000/airlines', {})
            .then((response: AxiosResponse) => {
                if (!response || !response.data) {
                    return Promise.reject("Response obj is empty");
                }

                AirlinesModel.airlines = response.data;
                if (!AirlinesModel.airlines.length) {
                    return Promise.reject("List of airlines is empty");
                }

                return Promise.resolve(true);
            })
            .catch((err: string | AxiosError) => {
                throw new Error(
                    typeof err !== "string"
                    ? `Type: ${err.response && err.response.data.name}; Message: ${err.response && err.response.data.message}`
                    : err
                );
            });
    }
}



