function diconsData(sequelize, Datatypes){

    alias = 'sales';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      created_at: {type: Datatypes.DATE},
      updated_at: {type: Datatypes.DATE},
      monto_unit: {type: Datatypes.STRING(500)},
      cantidad: {type: Datatypes.INTEGER},
      Usuario_id: {type: Datatypes.INTEGER},
      Detalle_Venta_id: {type: Datatypes.INTEGER},
      Producto_id: {type: Datatypes.INTEGER}
    };
    
    config = {camelCase: false, timestamps: false}; 
    
    const ventas = sequelize.define(alias,cols,config);

    ventas.associate = function (modelos){

        ventas.belongsTo(modelos.users, {
            as: "usuarios",
            foreignKey: "Usuario_id"
        });

        ventas.belongsTo(modelos.products, {
            as: "productos",
            foreignKey: "Producto_id"
        });

        ventas.belongsTo(modelos.sale_detail, {
            as: "detalle_ventas",
            foreignKey: "Detalle_venta_id"
        });
    };
    
    return ventas;
    
}
    
module.exports = diconsData;