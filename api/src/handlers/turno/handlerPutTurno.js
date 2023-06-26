const putTurno = require('../../Controllers/turno/putTurno');

const handlerPutTurno = async(req, res) => {
  try {
    const {tiempoAtencion, tiempoSalida, empleado} = req.body;
    const {id} = req.params;
    const nuevoTurno = await putTurno(tiempoAtencion, tiempoSalida, id, empleado);
    
    res.status(200).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPutTurno;
