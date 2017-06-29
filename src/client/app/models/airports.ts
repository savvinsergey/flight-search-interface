import axios, {AxiosResponse, AxiosError} from "axios";

// ----------- Interfaces ------------

interface ISearchByNameResponse extends AxiosResponse {
    query: string;
    airports: IAirport[];
}

export interface IAirport {
    airportCode: string;
    airportName: string;
    cityCode: string;
    cityName: string;
    countryCode: string;
    countryName: string;
    latitude: number;
    longitude: number;
    stateCode: string;
    timeZone: string;
}

// ----------- model code ------------

export default class AirportsModel {
    searchByName(query: string): Promise<any> {
        return axios.get("http://localhost:3000/airports", {
                params: {
                    q: query
                }
            })
            .then((response: ISearchByNameResponse) => {
                if (!response || !response.data) {
                    return Promise.reject("Response obj is empty");
                }

                if (!response.data.length) {
                    return Promise.reject("List of airports is empty");
                }

                let airports: Object[] = [];
                for (let airport of response.data) {
                    airports.push({
                        code: airport.airportCode,
                        name: airport.airportName,
                    });
                }

                return Promise.resolve(airports);
            })
            .catch((err: AxiosError | string) => {
                throw new Error(
                    typeof err !== "string"
                    ? `Type: ${err.response && err.response.data.name}; Message: ${err.response && err.response.data.message}`
                    : err
                );
            });

    }
}




