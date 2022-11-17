function diconsData(sequelize, Datatypes) {

    alias = 'category';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      created_at: {type: Datatypes.DATE},
      updated_at: {type: Datatypes.DATE},
      nombre: {type: Datatypes.STRING}
    };
    
    config = {camelCase: false, timestamps: false}; 
    
    const categoria = sequelize.define(alias,cols,config);

    categoria.associate = function (modelos){
    
        categoria.hasMany(modelos.products, {   
          as: "productos",
          foreignKey: "Categoria_id"
        });
    };
    
    return categoria;
    
    };
    
    
    module.exports = diconsData;