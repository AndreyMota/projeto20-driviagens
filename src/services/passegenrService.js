import { pasRepository } from "../repositories/mainRepository.js";

async function addPassenger(firstName, lastName) {
    /* const have = await pasRepository.findPassenger(firstName, lastName);
    if (have.rowCount > 0) throw {type: "conflict", message: "passenger ja foi cadastrado"} */
    await pasRepository.addPassenger(firstName, lastName);
    const newPassenger = await pasRepository.findPassenger(firstName, lastName);
    return newPassenger;
}

async function selectPassengersTravels() {
    const result = await pasRepository.selectPassengersTravels();
    return result.rows;
}

export const passengerService = {
    addPassenger,
    selectPassengersTravels
}