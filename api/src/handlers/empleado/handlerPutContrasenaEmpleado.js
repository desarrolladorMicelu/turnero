const putContrasenaEmpleado = require('../../Controllers/empleado/putContrasenaEmpleado');

const handlerPutContrasenaEmpleado = async(req, res) => {
  try {
    const {id, nombre, password} = req.body;
    
    const resultado = await putContrasenaEmpleado(nombre, password, id);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPutContrasenaEmpleado;