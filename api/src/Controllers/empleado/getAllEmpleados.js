const {Empleado} = require('../../db');
const bcrypt = require('bcryptjs'); 

const getAllEmpleados = async () => {

    const admin = await Empleado.findAll({
        where: {isAdmin: true}
    });
    
    if(!admin){
        const passwordhash = bcrypt.hashSync("micelu2023", parseInt(10));
        await Empleado.create({
            nombre: "admin1",
            sede:"Medellin",
            password: passwordhash,
            isAdmin:true
        })

        return await Empleado.findAll({
            where: {isAdmin: true}
        });;

    }
    else{
        const empleados = await Empleado.findAll({
            where: {isSede:false, isAdmin: false}
        });
        return empleados;
    

    }
}

module.exports = getAllEmpleados;