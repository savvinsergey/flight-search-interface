import {App} from './app.ts';

module app {
    document.addEventListener('DOMContentLoaded', () => {
        let app = new App(".container");
        app.start();
    });
}
