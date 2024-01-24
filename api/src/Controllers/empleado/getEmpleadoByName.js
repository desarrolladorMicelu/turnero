const { conn2 } = require('../../db');

const getEmpleadoByName = async (usuario) => {
    const empleadoSeleccionado = await conn2.models.Empleado.findOne({
        where: { nombre: usuario }
    });

    return empleadoSeleccionado;
}

module.exports = getEmpleadoByName;
