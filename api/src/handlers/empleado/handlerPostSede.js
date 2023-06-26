const postSede = require('../../Controllers/empleado/postSede')

const handlerPostSede = async(req, res) => {
  try {
    const {nombre, sede, password} = req.body;
    
    const nuevaSede = await postSede(nombre, sede, password);

    res.status(200).json(nuevaSede);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostSede;
