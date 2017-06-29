import * as moment from "moment";

import {IComponent, IFormError} from "../../interfaces.ts";
import {config} from "../../config.ts";

import AirlinesModel from "../../models/airlines.ts";
import AirportsModel from "../../models/airports.ts";
import FlightsModel from "../../models/flights.ts";

import {SearchResults} from '../../components/search-results/search-results.ts';
import {Typeahead} from '../../components/common/typeahead/typeahead.ts';
import {Datepicker} from '../../components/common/datepicker/datepicker.ts';

// ----------- Interfaces ------------

interface IFormData {
    locationFrom: string;
    locationTo: string;
    date: string;
}

// ----------- Component code ------------

export class SearchForm implements IComponent {
    public template: any;
    public element: Element;

    // Models
    private airportsModel: AirportsModel;
    private airlinesModel: AirlinesModel;
    private flightsModel: FlightsModel;

    // Child components
    private locationFromCmp: Typeahead;
    private locationToCmp: Typeahead;
    private datePickerCmp: Datepicker;
    private searchResultsCmp: SearchResults;

    constructor(private container: Element) {
        this.template = require("./search-form.template");

        this.airportsModel = new AirportsModel();
        this.airlinesModel = new AirlinesModel();
        this.flightsModel = new FlightsModel();
    }

    private generateDateRange(date: string): string[] {
        let datesRange: string[] = [];
        const beforeToday: number = config.countSearchDays.beforeToday,
              afterToday: number = config.countSearchDays.afterToday,
              currentDate: moment.Moment = moment({hour: 0, minute: 0, seconds: 0});

        for (let index = beforeToday; index >= 1; index--) {
            const prevDate: moment.Moment = <moment.Moment>moment(date, "YYYY-MM-DD").subtract(index, "day");
            if (!prevDate.isBefore(currentDate)) {
                datesRange.push(prevDate.format("YYYY-MM-DD"));
            }
        }

        datesRange.push(date);

        for (let index = 1; index <= afterToday; index++) {
            const nextDate: moment.Moment = <moment.Moment>moment(date, "YYYY-MM-DD").add(index, "day");
            datesRange.push(nextDate.format("YYYY-MM-DD"));
        }

        return datesRange;
    }

    private validateSearchForm(params: IFormData): boolean {
        let errors: IFormError[] = [
            ...this.datePickerCmp.validate(params.date),
            ...this.locationFromCmp.validate(params.locationFrom),
            ...this.locationToCmp.validate(params.locationTo)
        ];

        // ----------/ /

        if (errors.length) {
            errors.forEach((error: IFormError) => {
                console.error(error.message);
                $(error.element)
                    .parent()
                    .addClass("has-error")
                    .find("small")
                    .text(error.message)
                    .show();
            });
            return false;
        }

        return true;
    }

    private validateResults(results: (boolean | string)[]): boolean {
        let hasErrors: boolean = false;

        if (results.length) {
            results.forEach((item: boolean | string) => {
                if (item !== true) {
                    hasErrors = true;
                    console.error(`${item}`);
                }
            });

            if (hasErrors) {
                this.showErrorMessage("There were errors during receiving flights data. You can see them in the console");
            }
        }

        return hasErrors;
    }

    private hideErrorsMessages(): void {
        $("#location-from, #location-to, #date")
            .parent()
            .removeClass("has-error")
            .find("small")
            .hide();
    }

    private showErrorMessage(message: string): void {
        $("#search-errors-message")
            .text(message)
            .show();
    }

    private isLoading(value: boolean): void {
        if (value) {
            $("#search-errors-message").hide();
            $("#loading").show();
            $("#flight-search-btn").attr("disabled", "disabled");
        } else {
            $("#loading").hide();
            $("#flight-search-btn").removeAttr("disabled");
        }
    }

    private generateAndExecuteSearchRequests(datesRange: string[],
                                            locationFrom: string,
                                            locationTo: string): Promise<any> {
        let promisesFunctions: Function[] = [];
        for (let indexDate = 0; indexDate < datesRange.length; indexDate++) {
            for (let index = 0; index < AirlinesModel.airlines.length; index++) {
                const flightSearchTask: Function = this.flightsModel.find
                    .bind(
                        this.flightsModel,
                        AirlinesModel.airlines[index].code,
                        locationFrom,
                        locationTo,
                        datesRange[indexDate]
                    );

                promisesFunctions.push(flightSearchTask);
            }
        }

        let responseProcessing = (request: Function, result: any) =>
                request()
                    .then(Array.prototype.concat.bind(result))
                    .catch(Array.prototype.concat.bind(result));

        return promisesFunctions.reduce((promise: Promise<any>, request: Function) =>
            promise
                .then(result => responseProcessing(request, result))
                .catch(error => responseProcessing(request, error))
            , Promise.resolve([])
        );
    }

    private searchFlights(): void | undefined {
        const locationFrom: string = $("input", this.locationFromCmp.element).data("code"),
              locationTo: string = $("input", this.locationToCmp.element).data("code"),
              date: string = $("input", this.datePickerCmp.element).val();

        // Destroy previous results
        if (this.searchResultsCmp) {
            this.searchResultsCmp.destroy();
        }

        // Validation
        this.hideErrorsMessages();
        if (!this.validateSearchForm({ locationFrom, locationTo, date })) {
            return;
        }

        this.isLoading(true);
        this.airlinesModel.fetchAirlines()
            .then(() => {
                let datesRange: string[] = this.generateDateRange(date);

                this.flightsModel.flights = {};
                this.generateAndExecuteSearchRequests(datesRange, locationFrom, locationTo)
                    .then((result: (string | boolean)[]) => {
                        this.isLoading(false);
                        if (this.validateResults(result)) {
                            return;
                        }

                        this.renderSearchResults(date);
                    });
            })
            .catch((err: string) => {
                this.showErrorMessage("Couldn't get list of airlines. You can see an error in the console");
                this.isLoading(false);

                throw new Error(err);
            });
    }

    private searchAirports(query: string, process: Function): void {
        this.airportsModel.searchByName(query)
            .then((data: Object[]) => process(data))
            .catch((err: string) => {
                console.error(err);
            });
    }

    private renderSearchResults(date: string): void {
        let container: Element = <Element>document.querySelector(".container");
        this.searchResultsCmp = new SearchResults(container);

        this.searchResultsCmp.render({
            selectedDate: date,
            flights: this.flightsModel.flights
        });
    }

    public render(data: Object): void {
        this.element = $(this.template(data)).appendTo(this.container).get(0);

        setTimeout(() => {
            let searchAirportsFn: Function = this.searchAirports.bind(this),
                submitButton: Element;

            this.locationFromCmp = new Typeahead(
                <Element>document.querySelector("#location-from-group"),
                searchAirportsFn, {
                    id: "#location-from" ,
                    placeholder: "Enter FROM location",
                    label: "FROM location"
                });

            this.locationToCmp = new Typeahead(
                <Element>document.querySelector("#location-to-group"),
                searchAirportsFn, {
                    id: "#location-to" ,
                    placeholder: "Enter TO location",
                    label: "TO location"
                });

            this.datePickerCmp = new Datepicker(
                <Element>document.querySelector("#date-group"), {
                    id: "#date" ,
                    placeholder: "Select travel date",
                    label: "Date"
                });

            if (submitButton = <Element>document.querySelector("#flight-search-btn")) {
                submitButton.addEventListener("click", this.searchFlights.bind(this));
            }
        }, 0);
    }
}


