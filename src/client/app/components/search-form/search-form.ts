import * as moment from "moment";

import {IComponent} from "../../interfaces.ts";

import AirlinesModel from "../../models/airlines.ts";
import AirportsModel from "../../models/airports.ts";
import FlightsModel from "../../models/flights.ts";

import {SearchResults} from '../../components/search-results/search-results.ts';
import {Typeahead} from '../../components/common/typeahead.ts';
import {Datepicker} from '../../components/common/datepicker.ts';

// ----------- Interfaces ------------

interface IFormError {
    field: string;
    element: string;
    message: string;
}

// ----------- Component code ------------

export class SearchForm implements IComponent {
    private template: any;
    private element: Element;

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

    private generateDateRange(date) {
        return [
            moment(date, "YYYY-MM-DD")
                .subtract(2, "day")
                .format("YYYY-MM-DD"),
            moment(date, "YYYY-MM-DD")
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
            date,
            moment(date, "YYYY-MM-DD")
                .add(1, "day")
                .format("YYYY-MM-DD"),
            moment(date, "YYYY-MM-DD")
                .add(2, "day")
                .format("YYYY-MM-DD")
        ];
    }

    private hideErrorsMessages() {
        $("#location-from, #location-to, #date")
            .parent()
            .removeClass("has-error")
            .find("small")
            .hide();
    }

    private validateSearchForm(params: any): boolean {
        let errors: IFormError[] = [];
        if (!params.date || !/^\d{4}\-\d{2}\-\d{2}$/.test(params.date)) {
            errors.push({
                field: "date",
                element: "#date",
                message: "Bad 'date' param"
            });
        }

        if (!params.locationFrom || !/^[A-Z]{3}$/.test(params.locationFrom)) {
            errors.push({
                field: "locationFrom",
                element: "#location-from",
                message: "Bad 'locationFrom' param"
            });
        }

        if (!params.locationTo || !/^[A-Z]{3}$/.test(params.locationTo)) {
            errors.push({
                field: "locationTo",
                element: "#location-to",
                message: "Bad 'locationTo' param"
            });
        }

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
            return;
        }

        return true;
    }

    private showErrorMessage(message: string): void {
        $("#search-errors-message")
            .text(message)
            .show();
    }

    private searchFlight() {
        const locationFrom: string = $("#location-from").data("code"),
              locationTo: string = $("#location-to").data("code"),
              date: string = $("#date").val();

        // Destroy previous results
        if (this.searchResultsCmp) {
            this.searchResultsCmp.destroy();
        }

        // Validation
        this.hideErrorsMessages();
        if (!this.validateSearchForm({ locationFrom, locationTo, date })) {
            return;
        }

        $("#search-errors-message").hide();
        $("#loading").show();
        $("#flight-search-btn").attr("disabled", "disabled");

        this.airlinesModel.fetchAirlines()
            .then(() => {
                if (AirlinesModel.airlines.length) {
                    let datesRange: string[],
                        errors: string[] = [];

                    datesRange = this.generateDateRange(date);
                    this.flightsModel.flights = {};

                    for (let indexDate = 0; indexDate < datesRange.length; indexDate++) {
                        for (let index = 0; index < AirlinesModel.airlines.length; index++) {
                            let findFlightAsync = async () => {
                                try {
                                    await this.flightsModel.find(
                                        AirlinesModel.airlines[index].code,
                                        locationFrom,
                                        locationTo,
                                        datesRange[indexDate]
                                    );
                                } catch (err) {
                                    console.clear();
                                    errors.push(err);
                                }
                            };

                            findFlightAsync()
                                .then(() => {
                                    if (index === AirlinesModel.airlines.length - 1 && indexDate === datesRange.length - 1) {
                                        $("#loading").hide();
                                        $("#flight-search-btn").removeAttr("disabled");

                                        if (errors.length) {
                                            this.showErrorMessage("There were errors during receiving flights data. You can see them in the console");
                                            errors.forEach(error => console.error(error));
                                            return;
                                        }

                                        let container: Element = document.querySelector(".container");
                                        this.searchResultsCmp = new SearchResults(container);

                                        this.searchResultsCmp.render({
                                            selectedDate: date,
                                            flights: this.flightsModel.flights
                                        });
                                    }
                                });
                        }
                    }
                } else {
                    this.showErrorMessage("List of airlines is empty");
                }
            })
            .catch((err: string) => {
                this.showErrorMessage("Couldn't get list of airlines. You can see an error in the console");

                console.clear();
                console.error(err);
            });
    }

    private searchAirports(query, process) {
        this.airportsModel.searchByName(query)
            .then((data: Object[]) => process(data))
            .catch((err) => {
                console.clear();
                console.error(err);
            });
    }

    public render(data: Object): void {
        this.element = $(this.template(data)).appendTo(this.container).get(0);

        setTimeout(() => {
            let searchAirportsFn: Function = this.searchAirports.bind(this);

            this.locationFromCmp = new Typeahead("#location-from", searchAirportsFn);
            this.locationToCmp = new Typeahead("#location-to", searchAirportsFn);

            this.datePickerCmp = new Datepicker("#date");

            document
                .querySelector("#flight-search-btn")
                .addEventListener("click", this.searchFlight.bind(this));
        }, 0);
    }
}


