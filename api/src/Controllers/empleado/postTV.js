const {Empleado} = require('../../db');
const bcrypt = require('bcryptjs'); 


const postTV = async(nombre, sede, password)=>{

    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    
    const resultado = await Empleado.create({nombre, sede, password:passwordhash, isTV: true});

    return resultado;

}

module.exports = postTV;