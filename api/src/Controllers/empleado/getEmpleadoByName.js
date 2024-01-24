const {Empleado} = require('../../db').conn2;

const getEmpleadoByName = async (usuario) => {

    const empleadoSeleccionado = await Empleado.findOne({
        where: {nombre:usuario}
    });

    return empleadoSeleccionado;


}

module.exports = getEmpleadoByName;