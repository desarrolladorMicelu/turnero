const postCliente = require('../../Controllers/cliente/postCliente');

const handlerGetClientebyCel = async(req, res) => {
  try {
    const {celular, nombre, apellido,comoNosConociste} = req.body;
    const clienteNuevo = await postCliente(celular, nombre, apellido,comoNosConociste);

    res.status(200).json(clienteNuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetClientebyCel;
