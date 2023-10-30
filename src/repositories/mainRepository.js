import db from "../database/databaseConnection.js";

function addPassenger(firstName, lastName) {
    return db.query(`INSERT INTO passengers (firstName, lastName) VALUES ($1, $2)`, [firstName, lastName]);
}

function findPassenger(firstName, lastName) {
    return db.query('SELECT * FROM passengers WHERE firstName = $1 AND lastName = $2', [firstName, lastName]);
}

function findPassengerById(id) {
    return db.query('SELECT * FROM passengers WHERE id = $1', [id]);
}

function findCitie(name) {
    return db.query('SELECT * FROM cities WHERE name = $1', [name]);
}

function findCitieById(id) {
    return db.query('SELECT * FROM cities WHERE id = $1', [id]);
}

function addCitie(name) {
    return db.query('INSERT INTO cities (name) VALUES ($1)', [name]);
}

function addFlight(origin, destination, date) {
    return db.query('INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)', [origin, destination, date]);
}

function findFlight(origin, destination, date) {
    return db.query('SELECT * FROM flights WHERE origin = $1 AND destination = $2 AND date = $3', [origin, destination, date]);
}

function findFlightById(id) {
    return db.query('SELECT * FROM flights WHERE id = $1', [id]);
}

function addTravel(passengerId, flightId) {
    return db.query('INSERT INTO travels (passengerId, flightId) VALUES ($1, $2)', [passengerId, flightId]);
}

function findTravel(passengerId, flightId) {
    return db.query('SELECT * FROM travels WHERE passengerId = $1 AND flightId = $2', [passengerId, flightId]);
}

function selectFlights() {
    return db.query(`SELECT
    f.id AS id,
    o.name AS origin,
    d.name AS destination,
    TO_CHAR(f.date, 'DD-MM-YYYY') AS date
  FROM flights AS f
  JOIN cities AS o ON f.origin = o.id
  JOIN cities AS d ON f.destination = d.id
  ORDER BY f.date;
  `)
}

function selectFlightsWithOrigin(origin) {
    return db.query(`SELECT
    f.id AS id,
    o.name AS origin,
    d.name AS destination,
    TO_CHAR(f.date, 'DD-MM-YYYY') AS date
  FROM flights AS f
  JOIN cities AS o ON f.origin = o.id
  JOIN cities AS d ON f.destination = d.id
  WHERE o.name = $1  -- Substitua 'Nome da Origem' pelo nome da cidade de origem desejada
  ORDER BY f.date;
  `, [origin])
}

function selectFlightsWithDestin(destination) {
    return db.query(`SELECT
    f.id AS id,
    o.name AS origin,
    d.name AS destination,
    TO_CHAR(f.date, 'DD-MM-YYYY') AS date
  FROM flights AS f
  JOIN cities AS o ON f.origin = o.id
  JOIN cities AS d ON f.destination = d.id
  WHERE d.name = $1
  ORDER BY f.date;
  `, [destination])
}

function selectFlightsWithOriginDestin(origin, destination) {
    return db.query(`SELECT
    f.id AS id,
    o.name AS origin,
    d.name AS destination,
    TO_CHAR(f.date, 'DD-MM-YYYY') AS date
  FROM flights AS f
  JOIN cities AS o ON f.origin = o.id
  JOIN cities AS d ON f.destination = d.id
  WHERE o.name = $1  -- Substitua 'Nome da Origem' pelo nome da cidade de origem desejada
    AND d.name = $2  -- Substitua 'Nome do Destino' pelo nome da cidade de destino desejada
  ORDER BY f.date;
  `, [origin, destination])
}

function selectPassengersTravels() {
    return db.query(`SELECT
    CONCAT(p.firstName, ' ', p.lastName) AS passenger,
    COUNT(t.passengerId) AS travels
  FROM passengers AS p
  LEFT JOIN travels AS t ON p.id = t.passengerId
  GROUP BY p.id, p.firstName, p.lastName
  ORDER BY travels DESC;
  `)
}

export const pasRepository = {
    addPassenger,
    findPassenger,
    findPassengerById,
    findCitie, 
    addCitie,
    addFlight,
    findCitieById,
    findFlight,
    findFlightById,
    addTravel,
    findTravel,
    selectFlights,
    selectFlightsWithOrigin,
    selectFlightsWithDestin,
    selectFlightsWithOriginDestin,
    selectPassengersTravels
}