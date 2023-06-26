const {Empleado} = require('../../db');

const getAllEmpleados = async () => {

    const empleados = await Empleado.findAll({
        where: {isSede:false, isAdmin: false}
    });

    return empleados;


}

module.exports = getAllEmpleados;