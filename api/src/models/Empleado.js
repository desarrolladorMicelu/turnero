const { DataTypes, UUIDV1 } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Empleado', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sede: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      jefeTienda: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isSede: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isTV: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }

      },
      {
       timestamps:false
      });
  };