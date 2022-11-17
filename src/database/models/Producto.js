function productsData(sequelize, Datatypes) {

    alias = 'products';
    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        create_at: {type: Datatypes.DATE},
        update_at: {type: Datatypes.DATE},
        name: {type: Datatypes.STRING(500)},
        price: {type: Datatypes.FLOAT},
        discount: { type: Datatypes.INTEGER},
        category: { type: Datatypes.STRING},
        description: {type: Datatypes.STRING(1500)},
        image: {type: Datatypes.STRING}, // product-Img asi se llama en el formulario
    };

    config = {camelCase: false, timestamps: false}; 
    
    const productos = sequelize.define(alias,cols,config); // error al ejecutar

    productos.associate = function (modelos){

        productos.belongsTo(modelos.users, {
              as: "usuarios",
              foreignKey: "admin_id"
        });

        productos.belongsTo(modelos.category, {
            as: "categoria",
            foreignKey: "Categoria_id"
      });
    
        productos.hasMany(modelos.image, {   
          as: "imagen",
          foreignKey: "Producto_id"
        });

        productos.hasMany(modelos.sales, {   
            as: "ventas",
            foreignKey: "Producto_id",
          });
    };
    
    return productos;
}
    
module.exports = productsData;
