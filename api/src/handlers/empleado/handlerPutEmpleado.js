const putEmpleado = require('../../Controllers/empleado/putEmpleado');

const handlerPostSede = async(req, res) => {
  try {
    const {id, propiedad, valor} = req.body;
    
    const resultado = await putEmpleado(id, propiedad, valor);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostSede;