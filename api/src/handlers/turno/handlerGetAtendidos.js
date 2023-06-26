const getAtendidos = require('../../Controllers/turno/getAtendidos');

const handlerGetAtendidos = async(req, res) => {
  try {

    const atendidos = await getAtendidos()
    res.status(200).json(atendidos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAtendidos;