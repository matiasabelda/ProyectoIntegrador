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