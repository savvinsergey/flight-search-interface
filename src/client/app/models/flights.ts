import axios, {AxiosResponse, AxiosError} from "axios";
import * as moment from "moment";

// ----------- Interfaces ------------

interface IFindResponse extends AxiosResponse {
    params: Object;
    flights: IFlight[];
}

interface IAirline {
    code: string;
    name: string;
}

interface IFlightInfo {
    dateTime: string;
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

interface IFlightPlane {
    code: string;
    shortName: string;
    fullName: string;
    manufacturer: string;
    model: string;
}

export interface IFlight {
    key: string;
    airline: IAirline;
    flightNum: number;
    start: IFlightInfo;
    finish: IFlightInfo;
    plane: IFlightPlane;
    distance: number;
    durationMin: number;
    price: number;
}

// ----------- Model code ------------

export default class FlightsModel {
    public flights: {
        (key: string): IFlight[]
    } | {};

    find(airline: string,
         locationFrom: string,
         locationTo: string,
         date: string): Promise<any> {

        return new Promise((resolve, reject) => {
            axios.get('http://localhost:3000/flights_search/' + airline, {
                params: {
                    from: locationFrom,
                    to: locationTo,
                    date: date
                }
            })
            .then((response: IFindResponse) => {
                if (response.data) {
                    for (let index = 0; index < response.data.flights.length; index++) {
                        let startDateTime: string =  response.data.flights[index].start.dateTime;
                        response.data.flights[index].start.dateTime = moment(startDateTime).format('MM/DD/YYYY, h:mm a');

                        let finishDateTime: string =  response.data.flights[index].finish.dateTime;
                        response.data.flights[index].finish.dateTime = moment(finishDateTime).format('MM/DD/YYYY, h:mm a');
                    }

                    if (!this.flights[date]) {
                        this.flights[date] = [];
                    }

                    this.flights[date].push(...response.data.flights);
                    resolve(true);
                }
            })
            .catch((err: AxiosError) => {
                reject(`Type: ${err.response.data.name}; Message: ${err.response.data.message}`);
            });
        });
    }
}



