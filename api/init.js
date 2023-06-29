const {Empleado} = require('./src/db');
const bcrypt = require('bcryptjs'); 

const init = async()=>{
    const empleado = await Empleado.findOne({
      where: {
        isAdmin:true
      }
    })
  

    if(!empleado){
        const passwordhash = bcrypt.hashSync("micelu20233", parseInt(10));
        await Empleado.create({
            nombre: "admin1",
            sede:"Medellin",
            password: passwordhash,
            isAdmin:true
        })

    }
  
}

init();