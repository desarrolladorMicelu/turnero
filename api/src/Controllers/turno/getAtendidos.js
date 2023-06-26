const {Turno, Empleado, Cliente} = require('../../db');


const getAtendido = async()=>{
    
    const listaRenderizar = [];

    const turnos = await Turno.findAll({
        where: {
          atendido:true,
        }
    });

    for (let index = 0; index < turnos.length; index++) {
        const element = turnos[index];

        const clienteSelec = await Cliente.findOne({where: {id:element.clienteID}});
        const empleadoSelec = await Empleado.findOne({where: {id:element.empleadoID}});
        if(empleadoSelec){
            listaRenderizar.push({
                id:element.id,
                razon: element.razon,
                tiempoEntrada: element.tiempoEntrada,
                cliente: clienteSelec.nombre,
                empleado: empleadoSelec.nombre,
                tiempoAtencion: element.tiempoAtencion,
                tiempoSalida: element.tiempoSalida,
                sede: element.sede,
                habeasData: "Terminos aceptados",
                atendido:true
            })

        }

        
        
    }

    return listaRenderizar;
}

module.exports = getAtendido;