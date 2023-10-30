import pkg from 'http-status';
const { CREATED } = pkg;
import { citiesService } from '../services/citiesService.js';

export async function postCity(req, res) {
    const {name} = req.body;
    const insertedCitie = await citiesService.addCity(name);
    res.status(CREATED).json(insertedCitie.rows[insertedCitie.rows.length -1]);
}