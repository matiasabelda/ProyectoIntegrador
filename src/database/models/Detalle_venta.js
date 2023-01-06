function diconsData(sequelize, Datatypes) {

  alias = 'sale_detail';
  
  cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    createdAt: {type: Datatypes.DATE},
    updatedAt: {type: Datatypes.DATE},
    monto_total: {type: Datatypes.FLOAT},
    Detalle_Venta_id: {type: Datatypes.INTEGER}
  };
  
  config = {tableName: 'Detalle_venta', camelCase: false, timestamps: false}; 
  
  const detalle_ventas = sequelize.define(alias,cols,config);

  detalle_ventas.associate = function (modelos){
  
      detalle_ventas.hasMany(modelos.sales, {   
        as: "ventas",
        foreignKey: "Detalle_venta_id"
      });
  };
  
  return detalle_ventas;
  
  };
  
  
  module.exports = diconsData;