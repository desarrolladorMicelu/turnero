const {Empleado} = require('../../db').conn2;

const getAllSedes = async () => {

    const sedes = await Empleado.findAll({
        where: {isSede:true}
    });

    return sedes;


}

module.exports = getAllSedes;