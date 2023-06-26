const getClientebyCel = require('../../Controllers/cliente/getClientebyCel');
const handlerGetClientebyCel = async(req, res) => {
  try {
    const {cel} = req.params
    const cliente = await getClientebyCel(cel)
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetClientebyCel;
