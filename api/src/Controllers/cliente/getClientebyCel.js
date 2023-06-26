const {Cliente} = require('../../db');


const getClientebyCel = async(celular)=>{

    const cliente = await Cliente.findOne({
        where: { celular: celular },
        include: 'turnos',
      })

    return cliente
}

module.exports = getClientebyCel;