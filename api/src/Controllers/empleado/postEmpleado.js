const { conn2 } = require('../../db');
const Empleado = conn2.models.Empleado;
const bcrypt = require('bcryptjs'); 


const postEmpleado = async(nombre, sede, password)=>{

    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    const resultado = await Empleado.create({nombre, sede, password:passwordhash});

    return resultado;

}

module.exports = postEmpleado;