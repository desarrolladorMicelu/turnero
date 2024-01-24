const {Empleado} = require('../../db').conn2;

const getEmpleadosDashboard = async () => {

    const empleados = await Empleado.findAll({
        where: {isSede:false}
    });

    return empleados;


}

module.exports = getEmpleadosDashboard;