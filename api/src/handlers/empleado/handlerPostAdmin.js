const postAdmin = require('../../Controllers/empleado/postAdmin')

const handlerPostAdmin = async(req, res) => {
  try {
    const {nombre, sede, password} = req.body;
    
    const nuevoAdmin = await postAdmin(nombre, sede, password);

    res.status(200).json(nuevoAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostAdmin;
