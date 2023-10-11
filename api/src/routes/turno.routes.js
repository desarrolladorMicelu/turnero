const { Router } = require("express");
const handlerPostTurno = require('../handlers/turno/handlerPostTurno')
const handlerGetPendientes = require('../handlers/turno/handlerGetPendientes');
const hanlderPutTurno = require('../handlers/turno/handlerPutTurno');
const handlerGetAtendidos = require("../handlers/turno/handlerGetAtendidos");
const handlerGetAllTurnos = require("../handlers/turno/handlerGetAllTurnos");
const handlerGetEnAtencion = require("../handlers/turno/handlerGetEnAtencion");
const routeTurno = Router();


routeTurno.get("/", handlerGetAllTurnos);
// routeTurno.post("/", handlerPostTurno);
routeTurno.get("/pendientes", handlerGetPendientes);
routeTurno.get("/atendidos", handlerGetAtendidos);
routeTurno.get("/enAtencion", handlerGetEnAtencion)
// routeTurno.put("/actualizar/:id", hanlderPutTurno);


module.exports = routeTurno;