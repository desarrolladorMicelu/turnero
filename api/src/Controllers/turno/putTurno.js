const {Turno, Empleado} = require('../../db');

const putTurno = async(tiempoAtencion, tiempoSalida, id, empleado)=>{
    let turnoActualizado = {};
    if(!tiempoAtencion){
        turnoActualizado = await Turno.update(
            {tiempoSalida: tiempoSalida},
            {where: {id:id}}
        )
        

    }
    else{
        turnoActualizado = await Turno.update(
            {tiempoAtencion: tiempoAtencion, atendido: true},
            {where: {id:id}}
            
        )
        const turno = await Turno.findByPk(id);
        const empleado1 = await Empleado.findByPk(empleado);

        await turno.setEmpleado(empleado1);
    }

    return turnoActualizado;
}

module.exports = putTurno;