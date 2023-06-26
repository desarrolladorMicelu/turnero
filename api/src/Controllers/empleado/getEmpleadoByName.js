const {Empleado} = require('../../db');

const getEmpleadoByName = async (usuario) => {

    const empleadoSeleccionado = await Empleado.findOne({
        where: {nombre:usuario}
    });

    return empleadoSeleccionado;


}

module.exports = getEmpleadoByName;