
const controladorProducts = require('../controllers/productoControllers')

const express = require('express');
const router = express.Router();

/*** GET ALL PRODUCTS ***/
router.get('/', controladorProducts.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', controladorProducts.create); 
router.post('/create', controladorProducts.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', controladorProducts.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', controladorProducts.edit); 
router.put('/edit/:id', controladorProducts.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', controladorProducts.destroy); 

module.exports = router;
