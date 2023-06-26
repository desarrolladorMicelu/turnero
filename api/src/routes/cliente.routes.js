const { Router } = require("express");
const handlerGetClientebyCel = require("../handlers/cliente/HandlerGetClientebyCel");
const handlerPostCliente = require("../handlers/cliente/handlerPostCliente");

const routeCliente = Router();

routeCliente.get("/:cel", handlerGetClientebyCel);
routeCliente.post("/", handlerPostCliente);

module.exports = routeCliente;