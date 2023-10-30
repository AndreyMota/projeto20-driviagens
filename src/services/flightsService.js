import { pasRepository } from "../repositories/mainRepository.js";

function isDateGreaterThanToday(dateString) {
    const currentDate = new Date();
    const [day, month, year] = dateString.split('-').map(Number);
    const providedDate = new Date(year, month - 1, day);
    return providedDate > currentDate;
  }

async function addFlight(origin, destination, date) {
    const originCity = await pasRepository.findCitieById(origin);
    const destinCity = await pasRepository.findCitieById(destination);
    if (originCity.rowCount < 1 || destinCity.rowCount < 1) throw {type: "notFound", message: "Origem ou destino não encontrados"};

    if (origin === destination) throw {type: "conflict", message: "Destino e origem são iguais"};

    if (!isDateGreaterThanToday(date)) throw {type: "unprocessableEnity", message: "data fornecida é igual a atual ou passada"};

    await pasRepository.addFlight(origin, destination, date);
    return await pasRepository.findFlight(origin, destination, date);
    

}

async function selectFlights() {
    const result = await pasRepository.selectFlights();
    return result.rows;
}

async function selectFlightsWithOrigin(origin) {
    const originCity = await pasRepository.findCitie(origin);
    if (originCity.rowCount < 1) throw {type: "notFound", message: "Origem ou destino não encontrados"};
    const result = await pasRepository.selectFlightsWithOrigin(origin);
    return result.rows;

}

async function selectFlightsWithDestin(destination) {
    const destinCity = await pasRepository.findCitie(destination);
    if (destinCity.rowCount < 1) throw {type: "notFound", message: "Origem ou destino não encontrados"};
    const result = await pasRepository.selectFlightsWithDestin(destination);
    return result.rows;
}

async function selectFlightsWithOriginDestin(origin, destination) {
    const originCity = await pasRepository.findCitie(origin);
    const destinCity = await pasRepository.findCitie(destination);
    if (originCity.rowCount < 1 || destinCity.rowCount < 1) throw {type: "notFound", message: "Origem ou destino não encontrados"};
    const result = await pasRepository.selectFlightsWithOriginDestin(origin, destination);
    return result.rows;
}

export const flightService = {
    addFlight,
    selectFlights,
    selectFlightsWithOrigin,
    selectFlightsWithDestin,
    selectFlightsWithOriginDestin
}