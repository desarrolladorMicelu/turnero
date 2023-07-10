const {Turno} = require('../../db');
const getClienteByID = require('../cliente/getClienteByID');
const getEmpleadoByID = require('../empleado/getEmpleadoByID');

const getAllTurnos = async()=>{
    const turnosRenderizados = []
    const turnos = await Turno.findAll();

    for (let index = 0; index < turnos.length; index++) {
        let empleado = {nombre:'null'};
        const element = turnos[index];
        const cliente = await getClienteByID(element.clienteID);
        if(element.empleadoID){
            empleado = await getEmpleadoByID(element.empleadoID);
        }

        turnosRenderizados.push(
            {
                sede: element.sede,
                cliente: `${cliente.nombre} ${cliente.apellido}`,
                empleado: empleado.nombre,
                razon: element.razon,
                tiempoEntrada: element.tiempoEntrada,
                tiempoAtencion: element.tiempoAtencion,
                tiempoSalida: element.tiempoSalida,
                atendido: element.atendido
            }
        );

    }

    return turnosRenderizados;
}

module.exports = getAllTurnos;