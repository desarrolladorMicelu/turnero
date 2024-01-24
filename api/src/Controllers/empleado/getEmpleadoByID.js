const { conn2 } = require('../../db');
const Empleado = conn2.models.Empleado;


const getEmpleadoByID = async(id)=>{

    const empleado = await Empleado.findByPk(id);

    return empleado;
}

module.exports = getEmpleadoByID;