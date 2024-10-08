const getEmpleadoByName = require("../empleado/getEmpleadoByName");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { jwtPass } = process.env;




const inicioSesion = async(nombre, password)=>{

    const empleado = await getEmpleadoByName(nombre);
    

    if(empleado && bcrypt.compareSync(password, empleado.password)){
        const token = jwt.sign({
            nombre: empleado.nombre, 
            sede:empleado.sede,
            admin:empleado.isAdmin,
            jefeTienda: empleado.jefeTienda,
            isSede: empleado.isSede,
            isTV: empleado.isTV,
            id:empleado.id
        }, jwtPass);
        return {token:token, logueado: true};
    }else{
        return {logueado:false, message: "Usuario y/o contrasena incorrectos"};
    }

 

}

module.exports = inicioSesion;