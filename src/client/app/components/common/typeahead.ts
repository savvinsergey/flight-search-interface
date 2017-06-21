import "bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";

export class Typeahead {
    constructor(public element: string, source: Function) {
        $(element)
            .typeahead({
                minLength: 2,
                source: source,
                updater: (item) => {
                    $(element)
                        .data("code", item.code);

                    return item;
                },
            });
    }
}


