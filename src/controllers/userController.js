const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const userController = {

    registro: (req, res) => {
        return res.render('./users/register');
    },

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

    perfil: (req, res) => {
        res.render('./users/perfil');
    },

    login: (req, res) => {
        res.render('./users/login');
    },

    //agregue ha -----------------------------------------------------------------------------
    processLogin: function (req, res){
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('users.json',{encoding : 'utf-8'});
            let users;
            if (usersJSON == ""){
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }
            let usuarioALoguearse

            for (let i = 0; i < users.length; i++) {
                if(users[i].email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, users[i].password)){
                        usuarioALoguearse = users [i];
                        break;
                    }
                }
            }
            if (usuarioALoguearse == undefined) {
                return res.render (('login'), {errors: [
                    {msg: 'Credenciales inválidas'}
                ]});
            } 

            req.session.usuarioLogueado = usuarioALoguearse;
            if (req.body.connected != undefined){
                res.cookie('connected',
                usuarioALoguearse.email, { maxAge: 60000})
            }

            res.render ('Fue un exito');
          } else {
            return res.render(('./users/login'),{errors: errors.errors});
          }
    }
}


module.exports = userController;