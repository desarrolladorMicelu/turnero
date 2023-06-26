const { Router } = require('express');
const routeCliente = require('./cliente.routes');
const routeTurno = require('./turno.routes.js');
const routeEmpleado = require('./empleado.routes');
const routeInicioSesion = require('./inicioSesion.routes');
const router = Router();

router.use('/cliente', routeCliente);
router.use('/turno', routeTurno);
router.use('/empleado', routeEmpleado)
router.use('/inicioSesion', routeInicioSesion)



module.exports = router;