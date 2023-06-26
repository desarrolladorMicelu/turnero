const getEmpleadosDashboard = require('../../Controllers/empleado/getEmpleadosDashboard')

const handlerGetEmpleadosDashboard = async(req, res) => {
  try {
    
    const empleados = await getEmpleadosDashboard();

    res.status(200).json(empleados);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetEmpleadosDashboard;