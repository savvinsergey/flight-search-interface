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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("routing-controllers");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 2 */
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
__webpack_require__(9);
var routing_controllers_1 = __webpack_require__(0);
var AirlinesCtrl_ts_1 = __webpack_require__(3);
var AirportsCtrl_ts_1 = __webpack_require__(4);
var FlightsCtrl_ts_1 = __webpack_require__(5);
routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [
        AirlinesCtrl_ts_1.AirlinesCtrl,
        AirportsCtrl_ts_1.AirportsCtrl,
        FlightsCtrl_ts_1.FlightsCtrl
    ]
}).listen(3000);


/***/ }),
/* 3 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = __webpack_require__(0);
var AirlinesMdl_ts_1 = __webpack_require__(6);
var AirlinesCtrl = (function () {
    function AirlinesCtrl() {
        this.airlinesMdl = new AirlinesMdl_ts_1.AirlinesMdl();
    }
    AirlinesCtrl.prototype.getAll = function (request, response) {
        var _this = this;
        return this.airlinesMdl.getAll()
            .then(function () {
            response.send(_this.airlinesMdl.airlines);
        });
    };
    return AirlinesCtrl;
}());
__decorate([
    routing_controllers_1.Get("/airlines"),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AirlinesCtrl.prototype, "getAll", null);
AirlinesCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], AirlinesCtrl);
exports.AirlinesCtrl = AirlinesCtrl;


/***/ }),
/* 4 */
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
var AirportsMdl_ts_1 = __webpack_require__(7);
var AirportsCtrl = (function () {
    function AirportsCtrl() {
        this.airportsMdl = new AirportsMdl_ts_1.AirportsMdl();
    }
    AirportsCtrl.prototype.getAllByQuery = function (request, response) {
        return this.airportsMdl.getAllByQuery(request.query.q || "")
            .then(function (airports) {
            response.send(airports);
        });
    };
    return AirportsCtrl;
}());
__decorate([
    routing_controllers_1.Get("/airports"),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AirportsCtrl.prototype, "getAllByQuery", null);
AirportsCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], AirportsCtrl);
exports.AirportsCtrl = AirportsCtrl;


/***/ }),
/* 5 */
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
var FlightsMdl_ts_1 = __webpack_require__(8);
var FlightsCtrl = (function () {
    function FlightsCtrl() {
        this.flightsMdl = new FlightsMdl_ts_1.FlightsMdl();
    }
    FlightsCtrl.prototype.getAllByAirlineCode = function (request, response, airlineCode) {
        return this.flightsMdl.getAllByAirlineCode({
            airlineCode: airlineCode,
            date: request.query.date || "",
            locationFrom: request.query.from || "",
            locationTo: request.query.to || ""
        })
            .then(function (flights) {
            response.send(flights);
        });
    };
    return FlightsCtrl;
}());
__decorate([
    routing_controllers_1.Get("/flights_search/:airline_code"),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.Res()),
    __param(2, routing_controllers_1.Param("airline_code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], FlightsCtrl.prototype, "getAllByAirlineCode", null);
FlightsCtrl = __decorate([
    routing_controllers_1.JsonController(),
    __metadata("design:paramtypes", [])
], FlightsCtrl);
exports.FlightsCtrl = FlightsCtrl;


/***/ }),
/* 6 */
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
var axios_1 = __webpack_require__(1);
var routing_controllers_1 = __webpack_require__(0);
var AirlinesMdl = (function () {
    function AirlinesMdl() {
        this.airlines = [];
    }
    AirlinesMdl.prototype.getAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.airlines.length) {
                return resolve(true);
            }
            axios_1.default.get("http://node.locomote.com/code-task/airlines", {})
                .then(function (response) {
                if (response.data) {
                    _this.airlines = response.data;
                }
                resolve(true);
            })
                .catch(function (err) {
                throw new routing_controllers_1.InternalServerError(err);
            });
        });
    };
    return AirlinesMdl;
}());
exports.AirlinesMdl = AirlinesMdl;


/***/ }),
/* 7 */
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
var axios_1 = __webpack_require__(1);
var routing_controllers_1 = __webpack_require__(0);
var AirportsMdl = (function () {
    function AirportsMdl() {
    }
    AirportsMdl.prototype.getAllByQuery = function (query) {
        if (!query) {
            throw new routing_controllers_1.BadRequestError("Bad 'q' param");
        }
        return new Promise(function (resolve, reject) {
            axios_1.default.get("http://node.locomote.com/code-task/airports", {
                params: {
                    q: query
                }
            })
                .then(function (response) {
                resolve({
                    query: query,
                    airports: response.data || []
                });
            })
                .catch(function (err) {
                throw new routing_controllers_1.InternalServerError(err);
            });
        });
    };
    return AirportsMdl;
}());
exports.AirportsMdl = AirportsMdl;


/***/ }),
/* 8 */
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
var axios_1 = __webpack_require__(1);
var routing_controllers_1 = __webpack_require__(0);
var FlightsMdl = (function () {
    function FlightsMdl() {
    }
    FlightsMdl.prototype.getAllByAirlineCode = function (params) {
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
        return new Promise(function (resolve, reject) {
            axios_1.default.get("http://node.locomote.com/code-task/flight_search/" + params.airlineCode, {
                params: {
                    date: params.date,
                    from: params.locationFrom,
                    to: params.locationTo
                }
            })
                .then(function (response) {
                resolve({
                    params: params,
                    flights: response.data || []
                });
            })
                .catch(function (err) {
                throw new routing_controllers_1.InternalServerError(err);
            });
        });
    };
    return FlightsMdl;
}());
exports.FlightsMdl = FlightsMdl;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);