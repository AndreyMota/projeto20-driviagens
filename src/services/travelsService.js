import { pasRepository } from "../repositories/mainRepository.js";

async function addTravel(passengerId, flightId) {
    const ePassenger = await pasRepository.findPassengerById(passengerId);
    const eFlight = await pasRepository.findFlightById(flightId);

    if (ePassenger.rowCount < 1 && eFlight.rowCount < 1) throw {type: "notFound", message: "Passageiro ou voo não encontrados"};
    
    await pasRepository.addTravel(passengerId, flightId);
    return await pasRepository.findTravel(passengerId, flightId);
}

export const travelService = {
    addTravel
}