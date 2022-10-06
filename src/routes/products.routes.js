const productController = require('../controllers/productController')

const express = require('express');
const router = express.Router();



/*** GET ALL PRODUCTS ***/
router.get('/', productController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productController.create); 
router.post('/create', productController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', productController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productController.destroy);

/*** PRODUCTS IN CART***/
router.get('/carrito', productController.carrito);

module.exports = router;