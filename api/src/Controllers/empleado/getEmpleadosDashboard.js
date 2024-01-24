const { conn2 } = require('../../db');
const Empleado = conn2.models.Empleado;

const getEmpleadosDashboard = async () => {

    const empleados = await Empleado.findAll({
        where: {isSede:false}
    });

    return empleados;


}

module.exports = getEmpleadosDashboard;