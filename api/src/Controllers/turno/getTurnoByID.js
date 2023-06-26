const {Turno} = require('../../db');


const getTurnoByID = async(id)=>{

    const turno = await Turno.findByPk(id);

    return turno
}

module.exports = getTurnoByID;