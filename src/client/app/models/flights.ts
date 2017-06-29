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
    } | {} = {};

    find(airline: string,
         locationFrom: string,
         locationTo: string,
         date: string): Promise<any> {

        return axios.get('http://localhost:3000/flights_search/' + airline, {
                params: {
                    from: locationFrom,
                    to: locationTo,
                    date: date
                }
            })
            .then((response: IFindResponse) => {
                if (!response || !response.data) {
                    return Promise.reject(`Date: ${date} Message: Response obj is empty`);
                }

                for (let index = 0; index < response.data.length; index++) {
                    let startDateTime: string =  response.data[index].start.dateTime;
                    response.data[index].start.dateTime = moment(startDateTime).format('MM/DD/YYYY, h:mm a');

                    let finishDateTime: string =  response.data[index].finish.dateTime;
                    response.data[index].finish.dateTime = moment(finishDateTime).format('MM/DD/YYYY, h:mm a');
                }

                if (!this.flights[date]) {
                    this.flights[date] = [];
                }

                this.flights[date].push(...response.data);

                return Promise.resolve(true);
            })
            .catch((err: AxiosError | string) => {
                throw new Error(
                    typeof err !== "string"
                    ? `Type: ${err.response && err.response.data.name}; Date: ${date}; Message: ${err.response && err.response.data.message}`
                    : err
                );
            });

    }
}



