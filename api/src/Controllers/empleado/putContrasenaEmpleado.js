const {Empleado} = require('../../db').conn2;
const bcrypt = require('bcryptjs'); 

const putContrasenaEmpleado = async(nombre, password, id)=>{
    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    const empleado = await Empleado.update(
        {nombre: nombre, password:passwordhash},
        {where:{id:id}}
    );
    
    return empleado;
}

module.exports = putContrasenaEmpleado;