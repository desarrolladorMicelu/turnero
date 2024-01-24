const {Empleado} = require('../../db').conn2;


const getEmpleadoByID = async(id)=>{

    const empleado = await Empleado.findByPk(id);

    return empleado;
}

module.exports = getEmpleadoByID;