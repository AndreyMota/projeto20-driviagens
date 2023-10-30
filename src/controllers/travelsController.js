import { travelService } from "../services/travelsService.js";

export async function postTravel(req, res) {
    const { passengerId, flightId } = req.body;
    const result = await travelService.addTravel(passengerId, flightId);
    res.status(201).send(result.rows[result.rows.length -1]);
}