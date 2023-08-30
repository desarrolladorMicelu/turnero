const postTV = require('../../Controllers/empleado/postTV');

const handlerPostSede = async(req, res) => {
  try {
    const {nombre, sede, password} = req.body;
    
    const nuevoTV = await postTV(nombre, sede, password);

    res.status(200).json(nuevoTV);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostSede;
