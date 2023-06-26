const {Cliente} = require('../../db');


const postCliente = async(celular, nombre, apellido)=>{

    const nuevocliente = await Cliente.create({ celular, nombre, apellido });

    return nuevocliente;
}

module.exports = postCliente;