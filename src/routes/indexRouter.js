import { Router } from "express";
const route = Router();

route.get('/', (req, res) => {res.send('opa')});

export default route;