
const Sequelize = require('sequelize');
const db = require('../models/index.js');

function diconsData(sequelize, Datatypes) {

    alias = 'image';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      created_at: {type: Datatypes.DATE},
      updated_at: {type: Datatypes.DATE},
      avatar: {type: Datatypes.STRING}, // Ruta de almacenamiento de imagenes (o filename de la imagen: 16565654654.jgp)
      Producto_id: {type: Datatypes.INTEGER}
    };
    
    config = {camelCase: false, timestamps: false}; 
    
    const imagen = sequelize.define(alias, cols, config);

    imagen.associate = function (modelos){
    
        imagen.belongsTo(modelos.products, {   
          as: "productos",
          foreignKey: "Producto_id"
        });
    };
    
    return imagen;
    
};
    
module.exports = diconsData;