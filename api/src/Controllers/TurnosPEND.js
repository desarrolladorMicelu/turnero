//Consulta de turnos pendientes por atención en la base de datos atención
const Sequelize = require('sequelize');
const ATENCION = require('../modules/Turno');

ATENCION.getAll= async () => {
      const TurnosPEND = await turno.findAll({
        attributes: [nombre,apellido,razon,id],
        where: {
          atendido:0,
         }});
      return TurnosPEND;
    }
