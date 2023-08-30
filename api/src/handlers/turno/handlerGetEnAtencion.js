const getEnAtencion = require('../../Controllers/turno/getEnAtencion');

const handlerGetEnAtencion = async(req, res) => {
  try {

    const atendidos = await getEnAtencion()
    res.status(200).json(atendidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetEnAtencion;