import "bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";

import {IComponent, IParamsCommonCmp, IFormError} from "../../../interfaces";

export class Typeahead implements IComponent {
    public template: any;
    public element: Element;

    constructor(private container: Element,
                private source: Function,
                private params?: IParamsCommonCmp) {
        this.template = require("./typeahead.template");
        this.render();
    }

    public validate(value: string): IFormError[] {
        let errors: IFormError[] = [],
            name: string = (this.params && (this.params.label || this.params.id)) || "Field name wasn't specified";

        if (!value || !/^[A-Z]{3}$/.test(value)) {
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
            label: this.params && (this.params.label || "Label wasn't specified")
        })).appendTo(this.container).get(0);

        setTimeout(() => {
            $("input", this.element)
                .typeahead({
                    minLength: 2,
                    source: this.source,
                    updater: (item) => {
                        $("input", this.element)
                            .data("code", item.code);

                        return item;
                    },
                });
        }, 0);
    }
}
