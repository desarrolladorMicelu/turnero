const putTurno = require('../../Controllers/turno/putTurno');
const {io} = require('../../../index');
const handlerPutTurno = async(req, res) => {
  try {
    const {tiempoAtencion, tiempoSalida, empleado} = req.body;
    const {id} = req.params;
    const nuevoTurno = await putTurno(tiempoAtencion, tiempoSalida, id, empleado);
    
    console.log(io);
    // io.emit('actualizacion-turno', { mensaje: 'Se actualizó un turno' });


    res.status(200).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPutTurno;
