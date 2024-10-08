const {Turno} = require('../../db');
const getClienteByID = require('../cliente/getClienteByID');
const getEmpleadoByID = require('../empleado/getEmpleadoByID');

const getAllTurnos = async()=>{
    const turnosRenderizados = []
    const turnos = await Turno.findAll({
        order: [['tiempoEntrada', 'ASC']], // Ordenar por la columna 'fecha' en orden ascendente
      });

    for (let index = 0; index < turnos.length; index++) {
        let empleado = {nombre:'null'};
        let cliente = {nombre:'null'}; 
        const element = turnos[index];
        if(element.clienteID){
            cliente = await getClienteByID(element.clienteID);
        }
        if(element.empleadoID){
            empleado = await getEmpleadoByID(element.empleadoID);
        }

        if(!empleado.nombre){
            turnosRenderizados.push(
                {
                    sede: element.sede,
                    cliente: `${cliente.nombre} ${cliente.apellido}`,
                    empleado: null,
                    razon: element.razon,
                    tiempoEntrada: element.tiempoEntrada,
                    tiempoAtencion: element.tiempoAtencion,
                    tiempoSalida: element.tiempoSalida,
                    atendido: element.atendido
                }
            );
        }
        else if(!cliente.nombre){
            turnosRenderizados.push(
                {
                    sede: element.sede,
                    cliente: null,
                    empleado: empleado.nombre,
                    razon: element.razon,
                    tiempoEntrada: element.tiempoEntrada,
                    tiempoAtencion: element.tiempoAtencion,
                    tiempoSalida: element.tiempoSalida,
                    atendido: element.atendido
                }
            );
        }
        else if(!empleado.nombre && !cliente.nombre){
            turnosRenderizados.push(
                {
                    sede: element.sede,
                    cliente: null,
                    empleado: null,
                    razon: element.razon,
                    tiempoEntrada: element.tiempoEntrada,
                    tiempoAtencion: element.tiempoAtencion,
                    tiempoSalida: element.tiempoSalida,
                    atendido: element.atendido
                }
            );

        }

        else{
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
        

    }

    return turnosRenderizados;
}

module.exports = getAllTurnos;