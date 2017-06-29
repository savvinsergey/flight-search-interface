import "bootstrap-3-typeahead/bootstrap3-typeahead.min.js";

import {IComponent, IParamsCommonCmp, IFormError} from "../../../interfaces";

export class Datepicker implements IComponent {
    public template: any;
    public element: Element;

    constructor(private container: Element,
                private params?: IParamsCommonCmp) {
        this.template = require("./datepicker.template");
        this.render();
    }

    public validate(value: string): IFormError[] {
        let errors: IFormError[] = [],
            name: string = (this.params && (this.params.label || this.params.id)) || "Field name wan't specified";

        if (!value || !/^\d{4}\-\d{2}\-\d{2}$/.test(value)) {
            errors.push({
                element: this.element,
                message: `Bad '${name}' value`
            });
        }

        return errors;
    }

    public destroy(): void {
        this.element.remove();
    }

    public render(): void {
        if (this.element) {
            this.destroy();
        }

        this.element = $(this.template({
            id: this.params && (this.params.id || false),
            placeholder: this.params && (this.params.placeholder || ""),
            label: this.params && (this.params.label || "Label wasn't specified"),
        })).appendTo(this.container).get(0);

        setTimeout(() => {
            $("input", this.element)
                .datepicker({
                    orientation: "bottom left",
                    format: "yyyy-mm-dd",
                    startDate: new Date()
                });
        }, 0);
    }
}


