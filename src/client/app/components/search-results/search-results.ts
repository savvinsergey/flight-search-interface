import {IComponent} from "../../interfaces.ts";
import {IFlight} from "../../models/flights.ts";

// ----------- Interfaces ------------

interface IRenderData {
    selectedDate: string;
    isEmptyResult?: boolean;
    flights: {
        (key: string): IFlight[]
    } | {};
}

// ----------- Component code ------------

export class SearchResults implements IComponent {
    public template: any;
    public element: Element;

    constructor(private container: Element) {
        this.template = require("./search-results.template");
    }

    private preProcessingData(data: IRenderData): IRenderData {
        data.isEmptyResult = !Object.keys(data.flights).length;

        return data;
    }

    public destroy(): void {
        this.element.remove();
    }

    public render(data: IRenderData): void {
        if (this.element) {
            this.destroy();
        }

        this.element = $(this.template(
            this.preProcessingData(data)
        )).appendTo(this.container).get(0);

        setTimeout(() => {
            $(`[href="#result_day-${data.selectedDate}"]`)
                .parent()
                .addClass("active");

            $(`#result_day-${data.selectedDate}`)
                .addClass("active");
        }, 0);
    }
}



