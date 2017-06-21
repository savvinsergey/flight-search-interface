import "bootstrap-3-typeahead/bootstrap3-typeahead.min.js";

export class Datepicker {
    constructor(public element: string) {
        $(element)
            .datepicker({
                orientation: "bottom left",
                format: "yyyy-mm-dd",
                startDate: new Date()
            });
    }

}


