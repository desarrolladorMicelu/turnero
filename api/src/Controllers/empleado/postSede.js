const { conn2 } = require('../../db');
const Empleado = conn2.models.Empleado;
const bcrypt = require('bcryptjs'); 


const postSede = async(nombre, sede, password)=>{

    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    console.log(passwordhash);
    const resultado = await Empleado.create({nombre, sede, password:passwordhash, isSede: true});

    return resultado;

}

module.exports = postSede;