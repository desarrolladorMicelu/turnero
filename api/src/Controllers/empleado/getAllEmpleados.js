const {Empleado} = require('../../db');
const bcrypt = require('bcryptjs'); 
const postAdmin = require('./postAdmin');

const getAllEmpleados = async () => {

    const admin = await Empleado.findAll({
        where: {isAdmin: true}
    });
    
    if(!admin){
        console.log('hola');

        const primerAdmin = await postAdmin('admin1', 'Medellin', 1234);


        return primerAdmin;
    }
    else{
        const empleados = await Empleado.findAll({
            where: {isSede:false, isAdmin: false}
        });
        return empleados;
    

    }
}

module.exports = getAllEmpleados;