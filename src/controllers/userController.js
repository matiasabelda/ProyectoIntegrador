const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
var Sequelize = require("sequelize");

const db = require('../database/models'); 


const userController = {

    // Show Form Users Register
    registro: (req, res) => {
        return res.render('./users/register');
    },

    // Process Register - Create User
    processRegister: (req,res) => {

        var newUser = req.body;

        console.log(newUser.email); //-----------------------------
        console.log(newUser); //-----------------------------------

        db.users.findAll({
            where: {
              email: newUser.email
            }
          }).then((userBody) => {
            
            console.log(userBody); ////////////////////////////////////////

            if(userBody == "") {

            // Si el usuario no sube ningun avatar que se cargue una foto por default
            let imgUser = '';

            if(req.file) {

                imgUser = req.file.filename;

            } else {
                
                imgUser = 'profile.jpg';
            }
                db.users.create({
                    create_at: req.body.create_at,
                    update_at: req.body.update_at,
                    delete_at: req.body.delete_at,
                    name: req.body.name,
                    apell: req.body.apell,
                    nac: req.body.nac,
                    count: req.body.count,
                    email: req.body.email,
                    pass: bcrypt.hashSync(req.body.pass, 10),
                    gen: req.body.gen,
                    terms: req.body.terms,
                    avatar: imgUser,
                    admin: req.body.admin
                });

                return res.redirect('login');

            } else {

                res.render('./users/register',
                {msg: 'Este mail ya existe en nuestra base de datos'});
            }

          })

        
    },

    // Show Form login Users
    login: (req, res) => {
		return res.render('./users/login');
	},

    // Users Login Process
    loginProcess: (req, res) => {
        db.users.findAll({
            where: {
              email: req.body.email
            }
          }).then((usuario) => {

            let userToLogin = usuario;
            if(userToLogin.length > 0) {

                let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin[0].pass);

                if (isOkThePassword) { 

                    delete userToLogin[0].pass; // Borro la contrase??a de sesi??n por seguridad
                    req.session.userLogged = userToLogin;

                    if(req.body.remember_user) {
                        res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    res.redirect('/users/profile');

                    } else {

                        return res.render('./users/login', {msg: 'Las credenciales son inv??lidas'}

                        );
                }

            } else {

                return res.render('./users/login', {msg: 'Las credenciales son inv??lidas'}

                );
            }
            
            
          })
	},

    profile: (req, res) => {
		return res.render('./users/profile', {
			user: req.session.userLogged[0]
            
		});
        
	},

    profileEdit: (req, res) => {
        return res.render('./users/profileEdit');
    },
    profileData: (req, res) => {
        return res.render('./users/profileData');
    },


	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},

    // Delete - Delete specific product by id
	delete : (req, res) => {
		db.users.destroy({
			where:{
				id: req.params.id
			}
		}).then(() => {
            res.clearCookie('userEmail');
		    req.session.destroy();
			res.redirect("/");
		});
		
	},

    // API Route - Show all Users
	traerUsuarios: (req, res) => {

		db.users.findAll()
		.then((usuarios) =>{
			
			let listaUsuarios=[];

			for (usuario of usuarios){

				let itemUser={
                    
                    id: usuario.id,
                    nombre:  usuario.name,
                    apellido: usuario.apell,
                    genero: usuario.gen,
                    fechaNac: usuario.nac,
                    pais: usuario.count,
                    email: usuario.email,
                    avatar: "http://localhost:3002/img/users/" + usuario.avatar,
                    usuarioDesde: usuario.create_at
				}

				listaUsuarios.push(itemUser);
                
			}
            
            let cantidadUsuarios = listaUsuarios.length;
			res.json({
			descripcion: "Lista de Usuarios",
            cantidadUsuarios: cantidadUsuarios,
		    codigo: 200,
			data: listaUsuarios})
			
		});
		
	},

    traerUsuarioPorId: (req, res) => {

		db.users.findByPk(req.params.id)
		.then((usuario) =>{

			let itemUser={

                datosPersonales: {
                    nombre:  usuario.name,
                    apellido: usuario.apell,
                    genero: usuario.gen,
                    fechaNac: usuario.nac,
                    pais: usuario.count
                }, 

                datosUsuario: {
                    id: usuario.id,
                    email: usuario.email,
                    avatar: "http://localhost:3002/img/users/" + usuario.avatar
                }
            }

			res.json({
			descripcion: "Usuario encontrado por id " + req.params.id,
		    codigo: 200,
			data: itemUser})

		})
        .catch(error => {
			
		 	error = "Invalid string value: 'asdf'. Allowed values: [mostpopular]"

		 	res.json({
		 		error: "El Usuario buscado por el id " + req.params.id + " no se encuentra en nuestra base de datos",
		 		codigo: 400,
		 		Error: error
		 	})
		  
		})
		
	},

    // Root - Show users Quantity
	usersQuantity: (req, res) => {

		db.users.findAll()
		.then((usuarios) => {

			let listaUsuarios=[];
		
			for (user of usuarios){

				let itemUser = {

					id: user.id,
					nombre: user.name

				}

				listaUsuarios.push(itemUser);
				
			}
			let cantidadUsuarios = listaUsuarios.length;
			res.json(cantidadUsuarios
				)
		});

	},
    // ({attributes: ['Categoria_id', 'categorias.name'], group: 'Categoria_id', include: 'categorias' })
    
     usersByCountry: (req, res) => {

       //({group: ['users.count']})
        // const myAttrs = Object.keys(MyModel.rawAttributes)
        // MyModel.getAttributes()
         // usuarios.conutry?User.findAll({
  
            db.users.count({attributes: ["users.count"],
            group: "count",
            raw: true,
            order: ["count", "ASC"],
            })
	 	  	.then((grupo) => {
	 	  		console.log(grupo)
                   

	 	  		res.json({
	 	  			descripcion: "Cantidad de Usuarios por Paises",
	 	  			codigo: 200,
	 	  			data: grupo})

            })

                //  db.users.count({
                //     attributes: {
                //         include: [[Sequelize.fn("COUNT", Sequelize.col("users.country")), "users.count"]] 
                        
                //     },
                //     group: ['users.count']
                // })
                // .then((grupo) => {
                //     console.log(grupo)
   
                //     res.json({
                //         descripcion: "Cantidad de Usuarios por Paises",
                //         codigo: 200,
                //         data: grupo})
   
                //     })
    }

}

module.exports = userController;