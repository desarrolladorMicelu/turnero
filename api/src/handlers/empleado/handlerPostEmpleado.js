const postEmpleado = require('../../Controllers/empleado/postEmpleado');

const handlerPostEmpleado = async(req, res) => {
  try {
    const {nombre, sede, password} = req.body;
    
    const nuevoEmpleado = await postEmpleado(nombre, sede, password);

    res.status(200).json(nuevoEmpleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostEmpleado;
