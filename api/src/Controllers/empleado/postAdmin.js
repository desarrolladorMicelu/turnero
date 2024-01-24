const {Empleado} = require('../../db').conn2;
const bcrypt = require('bcryptjs'); 


const postAdmin = async(nombre, sede, password)=>{

    const passwordhash = bcrypt.hashSync(password, parseInt(10));
    
    const resultado = await Empleado.create({nombre, sede, password:passwordhash, isAdmin: true});

    return resultado;

}

module.exports = postAdmin;