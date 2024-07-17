const postTurno = require('../../Controllers/turno/postTurno');

const handlerGetClientebyCel = async(req, res) => {
  try {
    const {razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste} = req.body;
    
    const nuevoTurno = await postTurno(razon, tiempoEntrada, sede, celular, nombre, apellido,comoNosConociste);

    res.status(200).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetClientebyCel;
