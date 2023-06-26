const getPendientes = require('../../Controllers/turno/getPendientes');

const handlerGetPendientes = async(req, res) => {
  try {

    const pendientes = await getPendientes()
    res.status(200).json(pendientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetPendientes;