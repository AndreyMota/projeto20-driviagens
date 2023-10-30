import { flightService } from "../services/flightsService.js";

export async function postFlight(req, res) {
    const { origin, destination, date } = req.body;
    const result = await flightService.addFlight(origin, destination, date);
    res.status(201).send(result.rows[result.rows.length -1]);
}

export async function getFlights(req, res) {
    const origin = req.query.origin;
    const destination = req.query.destination;
    if (origin && destination) {
        const result = await flightService.selectFlightsWithOriginDestin(origin, destination);
        res.send(result);
    }
    if (origin && !destination) {
        const result = await flightService.selectFlightsWithOrigin(origin);
        res.send(result);
    }
    if (destination && !origin) {
        const result = await flightService.selectFlightsWithDestin(destination);
        res.send(result);
    }
    const result = await flightService.selectFlights();
    res.send(result);
    
    res.send([origin, destination]);
}