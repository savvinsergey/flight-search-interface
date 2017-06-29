/**
 *
 *  FLIGHT SERACH INTERFACE
 *  Config file.
 *
 *  Endpoints settings
 *
 */

export let config = {
    endpoints : {
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
