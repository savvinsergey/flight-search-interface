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
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:3000/airports", {
                    params: {
                        q: query
                    }
                })
                .then((response: ISearchByNameResponse) => {
                    let airports: Object[] = [];
                    if (response.data.airports.length) {
                        for (let airport of response.data.airports) {
                            airports.push({
                                code: airport.airportCode,
                                name: airport.airportName,
                            });
                        }
                    }

                    resolve(airports);
                })
                .catch((err: AxiosError) => {
                    reject(`Type: ${err.response.data.name}; Message: ${err.response.data.message}`);
                });
        });
    }
}




