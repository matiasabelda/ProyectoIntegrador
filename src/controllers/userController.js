const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../database/models'); 


const userController = {

    
    // Show Form Users Register
    registro: (req, res) => {
        return res.render('./users/register');
    },

    //ha agrego crear usuario------------------------------------
    // Process Register - Create User
    processRegister: (req,res) => {

        let userImage = "";
        if(req.file) {
			userImage = req.file.filename;
		} else {
			userImage = 'profile.jpg';
		}
        // 
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
            terms: req.body.terms,
            avatar: userImage,
            admin: req.body.admin
        });

	    return res.redirect('login');
    },

    // Process Register - Create User
    login: (req, res) => {
		db.users.findAll()
			.then(function(usuarios) {
				return res.render('./users/login', {usuarios: usuarios});
			}
		);
	},

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

                    delete userToLogin[0].pass; // Borro la contraseña de sesión por seguridad
                    req.session.userLogged = userToLogin;

                    if(req.body.remember_user) {
                        res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                    }

                    res.redirect('/users/profile');

                    } else {

                        return res.render('./users/login', {msg: 'Las credenciales son inválidas'}

                        );
                }

            } else {

                return res.render('./users/login', {msg: 'Las credenciales son inválidas'}

                );
            }
            
            
          })
	},

    profile: (req, res) => {
        console.log('Estoy en el profile')
        console.log(req.session.userLogged[0])
		return res.render('./users/profile', {
			user: req.session.userLogged[0]
            
		});
        
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	}

}

module.exports = userController;