import { pasRepository } from "../repositories/mainRepository.js"

async function addCity(name) {
    const have = await pasRepository.findCitie(name);
    if (have.rowCount > 0) throw {type: "conflict", message: "Cidade já cadastrada"}
    await pasRepository.addCitie(name);
    return await pasRepository.findCitie(name);
}

export const citiesService = {
    addCity
}