const postJefetienda = require('../../Controllers/empleado/postJefeTienda')

const handlerPostJefeTienda = async(req, res) => {
  try {
    const {nombre, sede, password} = req.body;
    
    const nuevoJefeTienda = await postJefetienda(nombre, sede, password);

    res.status(200).json(nuevoJefeTienda);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerPostJefeTienda;
