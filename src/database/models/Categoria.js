function diconsData(sequelize, Datatypes) {

  alias = 'category';
  
  cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    created_at: {type: Datatypes.DATE},
    updated_at: {type: Datatypes.DATE},
    name: {type: Datatypes.STRING}
  };
  
  config = {tableName: 'Categoria', camelCase: false, timestamps: false}; 
  
  const categorias = sequelize.define(alias,cols,config);

  categorias.associate = function (modelos){
  
      categorias.hasMany(modelos.products, {   
        as: "productos",
        foreignKey: "Categoria_id"
      });
  };
  
  return categorias;
  
  };
  
  
  module.exports = diconsData;