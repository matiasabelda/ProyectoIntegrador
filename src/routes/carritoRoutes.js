const controladorCarrito = require('../controllers/carritoControllers')

const express = require('express');
const router = express.Router();

router.get('/', controladorCarrito.carrito);

module.exports = router;
