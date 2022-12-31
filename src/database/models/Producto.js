function productsData(sequelize, Datatypes) {

  alias = 'products';

  cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      create_at: {type: Datatypes.DATE},
      update_at: {type: Datatypes.DATE},
      delete_at: {type: Datatypes.DATE},
      name: {type: Datatypes.STRING(500)},
      price: {type: Datatypes.FLOAT(10)},
      discount: {type: Datatypes.INTEGER},
      Categoria_id: {type: Datatypes.INTEGER},
      image: {type: Datatypes.STRING(500)},
      description: {type: Datatypes.STRING(1500)},
      admin_id: {type: Datatypes.INTEGER}, // las imagenes van en la tabla imagen
  };

  config = {tableName: 'Producto', camelCase: false, timestamps: false}; 
  
  const productos = sequelize.define(alias,cols,config); // error al ejecutar

  productos.associate = function (modelos){

      productos.belongsTo(modelos.users, {
            as: "usuarios",
            foreignKey: "Admin_id"
      });

      productos.belongsTo(modelos.category, {
          as: "categorias",
          foreignKey: "Categoria_id"
      });

      productos.hasMany(modelos.sales, {   
          as: "ventas",
          foreignKey: "Producto_id",
      });
  };
  
  return productos;
}
  
module.exports = productsData;
