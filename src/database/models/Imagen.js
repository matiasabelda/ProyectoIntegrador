function diconsData(sequelize, Datatypes) {

    alias = 'image';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      created_at: {type: Datatypes.DATE},
      updated_at: {type: Datatypes.DATE},
      storage: {type: Datatypes.STRING}, // Ruta de almacenamiento de imagenes
      Producto_id: {type: Datatypes.INTEGER}
    };
    
    config = {camelCase: false, timestamps: false}; 
    
    const imagen = sequelize.define(alias,cols,config);

    imagen.associate = function (modelos){
    
        imagen.belongTo(modelos.products, {   
          as: "productos",
          foreignKey: "Producto_id"
        });
    };
    
    return imagen;
    
};
    
module.exports = diconsData;