const {Empleado} = require('../../db');


const getEmpleadoByID = async(id)=>{

    const empleado = await Empleado.findByPk(id);

    return empleado;
}

module.exports = getEmpleadoByID;