import {IApp} from "./interfaces.ts";

import {SearchForm} from './components/search-form/search-form.ts';

export class App {
    public components: IApp;

    public constructor(context: string) {
        let container: Element = document.querySelector(context);

        // Initialize main components
        this.components = {
            "searchForm" : {
                instance: new SearchForm(container)
            }
        };
    }

    public start() {
        for (let prop in this.components) {
            if (this.components.hasOwnProperty(prop)) {
                this.components[prop].instance.render({});
            }
        }
    }
}


