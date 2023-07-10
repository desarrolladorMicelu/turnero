const { Router } = require("express");
const handlerPostEmpleado = require('../handlers/empleado/handlerPostEmpleado');
const handlerPostAdmin = require('../handlers/empleado/handlerPostAdmin');
const handlerPostJefeTienda = require('../handlers/empleado/handlerPostJefeTienda');
const handlerPostSede = require('../handlers/empleado/handlerPostSede');
const handlerGetAllSedes = require('../handlers/empleado/handlerGetAllSedes');
const handlerGetAllEmpleados = require('../handlers/empleado/handlerGetAllEmpleados');
const handlerGetEmpleadosDashboard = require('../handlers/empleado/handlerGetEmpleadosDashboard');
const handlerPutEmpleado = require('../handlers/empleado/handlerPutEmpleado');
const handlerPutContrasenaEmpleado = require('../handlers/empleado/handlerPutContrasenaEmpleado');
const routeEmpleado = Router();

routeEmpleado.get("/sede", handlerGetAllSedes);
routeEmpleado.get("/", handlerGetAllEmpleados);
routeEmpleado.get("/dashboard", handlerGetEmpleadosDashboard);
routeEmpleado.put("/", handlerPutEmpleado);
routeEmpleado.put("/actualizacion", handlerPutContrasenaEmpleado);
routeEmpleado.post("/", handlerPostEmpleado);
routeEmpleado.post("/admin", handlerPostAdmin);
routeEmpleado.post("/jefeTienda", handlerPostJefeTienda);
routeEmpleado.post("/sede", handlerPostSede);

module.exports = routeEmpleado;