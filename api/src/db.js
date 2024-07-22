const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { DB_URL, DB_URL2 } = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});

const sequelize2 = new Sequelize(DB_URL2, {
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
    if (file === 'Empleado.js') {
      modelDefiner(sequelize2);
    } else {
      modelDefiner(sequelize);
    }
  });

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Repetir el mismo proceso para sequelize2
entries = Object.entries(sequelize2.models);
capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize2.models = Object.fromEntries(capsEntries);

// Importar modelos de ambas conexiones
const { Turno, Cliente } = sequelize.models;
const { Empleado } = sequelize2.models;

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
  ...sequelize2.models, // Agregar los modelos de la segunda base de datos
  conn: sequelize,      // Conexión a la primera base de datos
  conn2: sequelize2,    // Conexión a la segunda base de datos
};
