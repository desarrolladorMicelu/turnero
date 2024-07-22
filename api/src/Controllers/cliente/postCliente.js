const {Cliente} = require('../../db');


const postCliente = async(celular, nombre, apellido,comoNosConociste)=>{

    const nuevocliente = await Cliente.create({ celular, nombre, apellido,comoNosConociste });

    return nuevocliente;
}

module.exports = postCliente;