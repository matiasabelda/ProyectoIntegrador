const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

const express = require('express');
const router = express.Router();

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
        cb(null, path.join(__dirname,'../../public/img/products'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
        let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
        cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });

/*** GET ALL PRODUCTS ***/
router.get('/', productController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productController.create); 
router.post('/create', uploadFile.single('product-img'), productController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', uploadFile.single('product-img'), productController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy);

/*** PRODUCTS IN CART***/
router.get('/carrito', productController.carrito);

module.exports = router;