const {Turno} = require('../../db');
const getClientebyCel = require('../cliente/getClientebyCel');
const postCliente = require('../cliente/postCliente');


const postTurno = async(razon, tiempoEntrada, sede, celular, nombre, apellido)=>{

    let cliente = await getClientebyCel(celular);

    const nuevoTurno = await Turno.create({ 
        razon, 
        tiempoEntrada, 
        habeasData: true,
        atendido:false,
        sede:sede
    });

    if(!cliente){
        cliente = await postCliente(celular, nombre, apellido)
    }

    await nuevoTurno.setCliente(cliente);


    

    return nuevoTurno;
}

module.exports = postTurno;