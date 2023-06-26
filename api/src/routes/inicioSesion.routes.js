const { Router } = require("express");
const handlerInicioSesion = require('../handlers/inicioSesion/handlerInicioSesion');
const handlerVerifyToken = require('../handlers/inicioSesion/handlerVerifyToken');
const routeInicioSesion = Router();

routeInicioSesion.post("/", handlerInicioSesion);
routeInicioSesion.post("/token", handlerVerifyToken);

module.exports = routeInicioSesion;