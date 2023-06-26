const getAllSedes = require('../../Controllers/empleado/getAllSedes')

const handlerGetAllSedes = async(req, res) => {
  try {
    
    const sedes = await getAllSedes();

    res.status(200).json(sedes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllSedes;