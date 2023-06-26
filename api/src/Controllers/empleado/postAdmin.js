const {Empleado} = require('../../db');
const bcrypt = require('bcryptjs'); 


const postTienda = async(nombre, sede, password)=>{

    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    
    const resultado = await Empleado.create({nombre, sede, password:passwordhash, isAdmin: true});

    return resultado;

}

module.exports = postTienda;