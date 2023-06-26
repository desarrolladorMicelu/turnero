const {Empleado} = require('../../db');

const getAllSedes = async () => {

    const sedes = await Empleado.findAll({
        where: {isSede:true}
    });

    return sedes;


}

module.exports = getAllSedes;