const { conn2 } = require('../../db');
const Empleado = conn2.models.Empleado;

const getAllSedes = async () => {

    const sedes = await Empleado.findAll({
        where: {isSede:true}
    });

    return sedes;


}

module.exports = getAllSedes;