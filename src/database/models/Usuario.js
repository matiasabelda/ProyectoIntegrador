function usersData(sequelize, Datatypes) {

    alias = 'users';
    cols = {
        id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
        create_at: {type: Datatypes.DATE},
        update_at: {type: Datatypes.DATE},
        delete_at: {type: Datatypes.DATE},
        name: {type: Datatypes.STRING(500)},
        apell: {type: Datatypes.STRING(500)},
        nac: {type: Datatypes.DATE},
        count: { type: Datatypes.STRING},
        email: { type: Datatypes.STRING},
        pass: {type: Datatypes.STRING(1500)},
        terms: {type: Datatypes.STRING},
        avatar: {type: Datatypes.image},
        admin: {type: Datatypes.BOOLEAN} //preguntar que Datatypes es, si admin, bit o string o a que se refiere el admin
    };

    config = {camelCase: false, timestamps: false}; 
    
    const usuarios = sequelize.define(alias,cols,config);

    usuarios.associate = function (modelos){
    
        usuarios.hasMany(modelos.sales, {   
          as: "ventas",
          foreignKey: "Usuario_id"
        });

        usuarios.hasMany(modelos.products, {   
            as: "productos",
            foreignKey: "admin_id",
          });
    };
    
    return usuarios;

}
    
module.exports = usersData;