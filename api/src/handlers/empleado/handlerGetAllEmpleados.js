const getAllEmpleados = require('../../Controllers/empleado/getAllEmpleados')

const handlerGetAllEmpleados = async(req, res) => {
  try {
    
    const empleados = await getAllEmpleados();

    res.status(200).json(empleados);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetAllEmpleados;