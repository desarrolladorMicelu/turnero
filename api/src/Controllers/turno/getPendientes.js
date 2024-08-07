const { Turno } = require('../../db');
const getClienteByID = require('../cliente/getClienteByID');

const getPendientes = async () => {
    const listaRenderizar = [];

    const turnos = await Turno.findAll({
        where: {
            atendido: false,
        },
        order: [
            ['tiempoEntrada', 'ASC']
        ]
    });

    for (let index = 0; index < turnos.length; index++) {
        const element = turnos[index];

        const clienteSelec = await getClienteByID(element.clienteID);

        if (clienteSelec) {
            listaRenderizar.push({
                id: element.id,
                razon: element.razon,
                tiempoEntrada: element.tiempoEntrada,
                cliente: `${clienteSelec.nombre} ${clienteSelec.apellido}`,
                celular: clienteSelec.celular,
                tiempoAtencion: element.tiempoAtencion,
                tiempoSalida: element.tiempoSalida,
                sede: element.sede,
                habeasData: "Terminos aceptados",
                atendido: false
            });
        } else {
            console.error(`Cliente no encontrado para clienteID: ${element.clienteID}`);
        }
    }

    return listaRenderizar;
};

module.exports = getPendientes;
