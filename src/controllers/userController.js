//agregue 

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/registerDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//agregue 


let userController = {

    registro: (req, res) => {
        res.render('./users/register');
    },
    perfil: (req, res) => {
        res.render('./users/perfil');
    },
    login: (req, res) => {
        res.render('./users/login');
    }
}


module.exports = userController;