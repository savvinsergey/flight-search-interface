/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("routing-controllers");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Config file.
 *
 *  Endpoints settings
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    endpoints: {
        airlines: {
            getAll: "http://node.locomote.com/code-task/airlines"
        },
        flights: {
            getAllByAirlineCode: "http://node.locomote.com/code-task/flight_search/"
        },
        airports: {
            getAllByQuery: "http://node.locomote.com/code-task/airports"
        }
    }
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Main application file.
 *
 *  Create and launch server here
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(10);
var routing_controllers_1 = __webpack_require__(0);
var AirlinesCtrl_ts_1 = __webpack_require__(4);
var AirportsCtrl_ts_1 = __webpack_require__(5);
var FlightsCtrl_ts_1 = __webpack_require__(6);
routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [
        AirlinesCtrl_ts_1.AirlinesCtrl,
        AirportsCtrl_ts_1.AirportsCtrl,
        FlightsCtrl_ts_1.FlightsCtrl
    ]
}).listen(3000);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airlines controller file.
 *
 *  Controller for processing airlines entity requests
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = __webpack_require__(0);
var AirlinesMdl_ts_1 = __webpack_require__(7);
var AirlinesCtrl = (function () {
    function AirlinesCtrl() {
        this.airlinesMdl = new AirlinesMdl_ts_1.AirlinesMdl();
    }
    AirlinesCtrl.prototype.getAll = function () {
        return this.airlinesMdl.getAll();
    };
    return AirlinesCtrl;
}());
__decorate([
    routing_controllers_1.Get("/airlines"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AirlinesCtrl.prototype, "getAll", null);
AirlinesCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], AirlinesCtrl);
exports.AirlinesCtrl = AirlinesCtrl;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airports controller file.
 *
 *  Controller for processing airports entity requests
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = __webpack_require__(0);
var AirportsMdl_ts_1 = __webpack_require__(8);
var AirportsCtrl = (function () {
    function AirportsCtrl() {
        this.airportsMdl = new AirportsMdl_ts_1.AirportsMdl();
    }
    AirportsCtrl.prototype.getAllByQuery = function (request) {
        return this.airportsMdl.getAllByQuery(request.query && (request.query.q || ""));
    };
    return AirportsCtrl;
}());
__decorate([
    routing_controllers_1.Get("/airports"),
    __param(0, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AirportsCtrl.prototype, "getAllByQuery", null);
AirportsCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], AirportsCtrl);
exports.AirportsCtrl = AirportsCtrl;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Flights controller file.
 *
 *  Controller for processing flights entity requests
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = __webpack_require__(0);
var FlightsMdl_ts_1 = __webpack_require__(9);
var FlightsCtrl = (function () {
    function FlightsCtrl() {
        this.flightsMdl = new FlightsMdl_ts_1.FlightsMdl();
    }
    FlightsCtrl.prototype.getAllByAirlineCode = function (request, airlineCode) {
        return this.flightsMdl.getAllByAirlineCode({
            airlineCode: airlineCode,
            date: request.query && (request.query.date || ""),
            locationFrom: request.query && (request.query.from || ""),
            locationTo: request.query && (request.query.to || "")
        });
    };
    return FlightsCtrl;
}());
__decorate([
    routing_controllers_1.Get("/flights_search/:airline_code"),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.Param("airline_code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FlightsCtrl.prototype, "getAllByAirlineCode", null);
FlightsCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], FlightsCtrl);
exports.FlightsCtrl = FlightsCtrl;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airlines model file.
 *
 *  Model for airlines entity
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(2);
var routing_controllers_1 = __webpack_require__(0);
var config_1 = __webpack_require__(1);
var AirlinesMdl = (function () {
    function AirlinesMdl() {
        this.airlines = [];
    }
    AirlinesMdl.prototype.getAll = function () {
        var _this = this;
        if (this.airlines.length) {
            return Promise.resolve(this.airlines);
        }
        return axios_1.default.get(config_1.config.endpoints.airlines.getAll, {})
            .then(function (response) {
            if (!response || !response.data) {
                return Promise.reject("Response obj is empty");
            }
            _this.airlines = response.data;
            return Promise.resolve(_this.airlines);
        })
            .catch(function (err) {
            throw new routing_controllers_1.InternalServerError(typeof err !== "string"
                ? err.response && err.response.data
                : err);
        });
    };
    return AirlinesMdl;
}());
exports.AirlinesMdl = AirlinesMdl;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Airports model file.
 *
 *  Model for airports entity
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(2);
var routing_controllers_1 = __webpack_require__(0);
var config_1 = __webpack_require__(1);
var AirportsMdl = (function () {
    function AirportsMdl() {
    }
    AirportsMdl.prototype.validate = function (query) {
        if (!query) {
            throw new routing_controllers_1.BadRequestError("Bad 'q' param");
        }
    };
    AirportsMdl.prototype.getAllByQuery = function (query) {
        this.validate(query);
        return axios_1.default.get(config_1.config.endpoints.airports.getAllByQuery, {
            params: {
                q: query
            }
        })
            .then(function (response) {
            return Promise.resolve(response.data || []);
        })
            .catch(function (err) {
            throw new routing_controllers_1.InternalServerError(err.response && err.response.data);
        });
    };
    return AirportsMdl;
}());
exports.AirportsMdl = AirportsMdl;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 *  FLIGHT SERACH INTERFACE
 *  flights model file.
 *
 *  Model for flights entity
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(2);
var routing_controllers_1 = __webpack_require__(0);
var config_1 = __webpack_require__(1);
var FlightsMdl = (function () {
    function FlightsMdl() {
    }
    FlightsMdl.prototype.validateParams = function (params) {
        if (!params.airlineCode) {
            throw new routing_controllers_1.BadRequestError("Bad 'airlineCode' param");
        }
        if (!params.date || !/^\d{4}\-\d{2}\-\d{2}$/.test(params.date)) {
            throw new routing_controllers_1.BadRequestError("Bad 'date' param");
        }
        if (!params.locationFrom || !/^[A-Z]{3}$/.test(params.locationFrom)) {
            throw new routing_controllers_1.BadRequestError("Bad 'locationFrom' param");
        }
        if (!params.locationTo || !/^[A-Z]{3}$/.test(params.locationTo)) {
            throw new routing_controllers_1.BadRequestError("Bad 'locationTo' param");
        }
    };
    FlightsMdl.prototype.getAllByAirlineCode = function (params) {
        this.validateParams(params);
        return axios_1.default.get(config_1.config.endpoints.flights.getAllByAirlineCode + params.airlineCode, {
            params: {
                date: params.date,
                from: params.locationFrom,
                to: params.locationTo
            }
        })
            .then(function (response) {
            if (!response || !response.data) {
                return Promise.reject("Response obj is empty");
            }
            return Promise.resolve(response.data);
        })
            .catch(function (err) {
            throw new routing_controllers_1.InternalServerError(typeof err !== "string"
                ? err.response && err.response.data
                : err);
        });
    };
    return FlightsMdl;
}());
exports.FlightsMdl = FlightsMdl;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);