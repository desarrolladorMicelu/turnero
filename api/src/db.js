const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { DB_URL, DB_URL2 } = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const modelDefiner = require(path.join(__dirname, "/models", file));
    // Usar sequelize para todos los modelos, excepto Empleado
    modelDefiner(sequelize);

  });

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);



// Importar modelos de ambas conexiones
const { Turno, Cliente, Empleado } = sequelize.models;

Cliente.hasMany(Turno, {
    foreignKey: 'clienteID',
    as: 'turnos',
});

Turno.belongsTo(Cliente, {
  foreignKey: 'clienteID',
  as: 'cliente',
});

Empleado.hasMany(Turno, {
  foreignKey: 'empleadoID',
  as: 'turnos',
});

Turno.belongsTo(Empleado, {
  foreignKey: 'empleadoID',
  as: 'empleado',
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,      // Conexión a la primera base de datos
};
