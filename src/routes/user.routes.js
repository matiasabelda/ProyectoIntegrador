const path = require('path');
const fs = require('fs')
const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/userController');

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const multer = require('multer');

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
        cb(null, path.join(__dirname,'../../public/img/users'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
        let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
        cb(null, imageName);         
    }
});

const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('No es una imagen'));
    }
};

const limits = {
    fileSize: 1024 * 1024 * 2, // tamaño en bytes, 1 mb 
    fieldNameSize: 90
}

const uploadFile = multer({ storage: multerDiskStorage, fileFilter: fileFilter, limits: limits });

// Vista de Registro de Nuevos Usuarios
router.get('/register', guestMiddleware, userController.registro); 

// Procesamiento de Registro de Nuevos Usuarios
router.post('/register', uploadFile.single('avatar'), userController.processRegister); 

// Vista de login de Usuarios
router.get('/login', guestMiddleware, userController.login);

// Procesamiento de login de Usuarios
router.post('/login', userController.loginProcess); 

// Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile);

// Perfil de editar Usuario
router.get('/profileEdit', authMiddleware, userController.profileEdit);

// Perfil de Data Usuario
router.get('/profileData', authMiddleware, userController.profileData);

// Actualizar Perfil de Usuario
router.post('/profileData', uploadFile.single('avatar'), userController.update);

// Logout
router.get('/logout', userController.logout);

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', userController.delete);

/***SHOW ALL USERS***/
router.get('/traerUsuarios', userController.traerUsuarios);

/***SHOW ALL USERS by ID***/
router.get('/traerUsuarioPorId/:id', userController.traerUsuarioPorId);

/***SHOW USERS QUANTITY***/
router.get('/usersQuantity', userController.usersQuantity);

/***SHOW USERS QUANTITY***/
router.get('/usersByCountry', userController.usersByCountry);



router.get('/check', function (req, res){
    if(req.session.usuarioLogueado == undefined) {
        res.send('No estas Logueado');
    } else {
        res.send("El usuario Logueado es " + req.session.usuarioLogueado.email);
    }
});



module.exports = router;

