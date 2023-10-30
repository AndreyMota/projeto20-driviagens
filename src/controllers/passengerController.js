import pkg from 'http-status';
const { CREATED } = pkg;
import { passengerService } from '../services/passegenrService.js';

export async function postPassenger(req, res) {
    const {firstName, lastName} = req.body;
    const insertedPassenger = await passengerService.addPassenger(firstName, lastName);
    res.status(CREATED).json(insertedPassenger.rows[insertedPassenger.rows.length -1]);
}

export async function getPassengersTravels(req, res) {
    const result = await passengerService.selectPassengersTravels();
    res.send(result);
}