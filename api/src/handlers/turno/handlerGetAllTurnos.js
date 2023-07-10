const getAllTurnos = require('../../Controllers/turno/getAllTurnos');

const handlerGetAllTurnos= async(req, res) => {
  try {

    const turnos = await getAllTurnos();
    res.status(200).json(turnos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllTurnos;