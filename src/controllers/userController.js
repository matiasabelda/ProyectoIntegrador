const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const db = require('../database/models'); // agrego ha Importo toda la carpeta models incluyendo Sequelize con sus metodos

const userController = {

    registro: (req, res) => {
        return res.render('./users/register');
    },

    //ha agrego crear usuario------------------------------------
   processRegister: (req,res) => {
	db.users.create({
		create_at: req.body.create_at,
        update_at: req.body.update_at,
        delete_at: req.body.delete_at,
        name: req.body.name,
        apell: req.body.apell,
        nac: req.body.nac,
        count: req.body.count,
        email: req.body.email,
        pass: req.body.pass,
        terms: req.body.terms,
        avatar: req.body.avatar,
        admin: req.body.admin
	});
	res.redirect("/users")},

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0 ){
            return res.render('register', {
            errors: resultValidation.mapped(), 
            oldata: req.body    
            });
        }

        let datos = req.body;
        let imagenUsuario = '';
        let userInDB = User.findByField('email', req.body.email);

        if(userInDB) { 
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este mail ya está registrado'
                    }
                },
                oldData: req.body
            });
        }
        if(req.file) {
			imagenUsuario = req.file.filename;
		} else {
			imagenUsuario = 'profile.jpg';
		}

        let userToCreate = {
            ...req.body,
            pass: bcrypt.hashSync(datos.pass, 10),
            avatar: imagenUsuario
        }

        let userCreated = User.create(userToCreate);
		
        return res.redirect('login');
    },

    login: (req, res) => {
        return res.render('./users/login');
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
        if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.pass);
			if (isOkThePassword) {
				delete userToLogin.pass; // Borro la contraseña de sesión por seguridad
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	}, 

    profile: (req, res) => {
		return res.render('./users/profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

}

module.exports = userController;