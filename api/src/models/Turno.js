const { DataTypes, UUIDV1 } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Turno', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      razon: {
        type: DataTypes.ENUM,
        values: ['ASESORIA Y VENTA', 'GARANTIA', 'SERVICIO TECNICO', 'CREDITO'],
        allowNull: false,
      },
      tiempoEntrada: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tiempoAtencion:{
        type: DataTypes.DATE,
        allowNull: true,
      },
      tiempoSalida: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      habeasData: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      atendido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      sede: {
        type: DataTypes.STRING,
        allowNull: false,
      }},
      {
       timestamps:false
      });
  };