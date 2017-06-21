/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Main application file.
 *
 *  Create and launch server here
 *
 */

import "reflect-metadata";
import {createExpressServer} from "routing-controllers";

import {AirlinesCtrl} from "./controllers/AirlinesCtrl.ts";
import {AirportsCtrl} from "./controllers/AirportsCtrl.ts";
import {FlightsCtrl} from "./controllers/FlightsCtrl.ts";

createExpressServer({
    cors: true,
    controllers: [
        AirlinesCtrl,
        AirportsCtrl,
        FlightsCtrl
    ]
}).listen(3000);