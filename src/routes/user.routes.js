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

router.get('/login', userController.login);

router.get('/perfil', userController.perfil);


module.exports = router;