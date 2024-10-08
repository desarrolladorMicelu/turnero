const {Empleado} = require('../../db');

const getEmpleadosDashboard = async () => {

    const empleados = await Empleado.findAll({
        where: {isSede:false}
    });

    return empleados;


}

module.exports = getEmpleadosDashboard;