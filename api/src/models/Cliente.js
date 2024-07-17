const { DataTypes, UUIDV1 } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Cliente', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      celular: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comoNosConociste:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      },
      {
       timestamps:false
      });
  };