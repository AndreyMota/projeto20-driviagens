import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { citySchema, flightSchema, passengerSchema, travelSchema } from "../schemas/mainSchemas.js";
import { getPassengersTravels, postPassenger } from "../controllers/passengerController.js";
import { postCity } from "../controllers/citiesControllers.js";
import { getFlights, postFlight } from "../controllers/flightsController.js";
import { postTravel } from "../controllers/travelsController.js";
const route = Router();

route.post('/', validateSchema(passengerSchema), postPassenger);
route.post('/cities', validateSchema(citySchema), postCity)
route.post('/flights', validateSchema(flightSchema), postFlight);
route.post('/travels', validateSchema(travelSchema), postTravel);

route.get('/flights', getFlights);
route.get('/passengers/travels', getPassengersTravels);

export default route;