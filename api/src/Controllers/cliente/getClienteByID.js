const {Cliente} = require('../../db');


const getClienteByID = async(id)=>{

    const cliente = await Cliente.findByPk(id);

    return cliente
}

module.exports = getClienteByID;