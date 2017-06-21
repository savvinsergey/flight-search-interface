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
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/airlines', {})
                .then((response: AxiosResponse) => {
                    if (response.data) {
                        AirlinesModel.airlines = response.data;
                        resolve(true);
                    }
                })
                .catch((err: AxiosError) => {
                    reject(`Type: ${err.response.data.name}; Message: ${err.response.data.message}`);
                });
        });
    }
}



