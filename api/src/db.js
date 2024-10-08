require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/MiCelu`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// ); 



const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

const {Turno, Cliente, Empleado} = sequelize.models;


  Cliente.hasMany(Turno, {
      foreignKey: 'clienteID', // nombre del campo de clave foránea en la tabla de Turnos
      as: 'turnos', // nombre de la propiedad para acceder a los turnos asociados
  });


  Turno.belongsTo(Cliente, {
    foreignKey: 'clienteID', // nombre del campo de clave foránea en la tabla de Turnos
    as: 'cliente', // nombre de la propiedad para acceder al cliente asociado
  });

  Empleado.hasMany(Turno, {
    foreignKey: 'empleadoID', // nombre del campo de clave foránea en la tabla de Turnos
    as: 'turnos', // nombre de la propiedad para acceder a los turnos asociados
});


Turno.belongsTo(Empleado, {
  foreignKey: 'empleadoID', // nombre del campo de clave foránea en la tabla de Turnos
  as: 'empleado', // nombre de la propiedad para acceder al cliente asociado
});




module.exports = {
  ...sequelize.models,
  conn: sequelize,
};