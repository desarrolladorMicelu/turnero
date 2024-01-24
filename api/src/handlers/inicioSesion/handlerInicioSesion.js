const inicioSesion = require("../../Controllers/inicioSesion/inicioSesion");

const handlerInicioSesion = async(req, res) => {
  try {
    const {nombre, password} = req.body;
    const login = await inicioSesion(nombre, password);

    res.status(200).json(login);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerInicioSesion;