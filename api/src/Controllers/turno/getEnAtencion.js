const {Turno, sequelize, Sequelize } = require('../../db');
const getClienteByID = require('../cliente/getClienteByID');

const getEnAtencion = async()=>{
    
    const listaRenderizar = [];

    const turnos = await Turno.findAll({
        where: {
            atendido: true,
            tiempoSalida: null
        },
        order: [
            ['tiempoEntrada', 'DESC']
        ]
    });
    

    for (let index = 0; index < turnos.length; index++) {
        const element = turnos[index];

        const clienteSelec = await getClienteByID(element.clienteID);

        listaRenderizar.push({
            id:element.id,
            razon: element.razon,
            tiempoEntrada: element.tiempoEntrada,
            cliente: `${clienteSelec.nombre} ${clienteSelec.apellido}`,
            celular: clienteSelec.celular,
            tiempoAtencion: element.tiempoAtencion,
            sede: element.sede,
            habeasData: "Terminos aceptados",
            atendido:false
        })
        
    }

    return listaRenderizar;
}

module.exports = getEnAtencion;


