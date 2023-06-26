const verificarToken = require('../../Controllers/inicioSesion/verificarToken');

const handlerVerificarToken = (req, res) => {
  try {
    const {token} = req.body;
    const tokenData = verificarToken(token);

    res.status(200).json(tokenData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerVerificarToken;