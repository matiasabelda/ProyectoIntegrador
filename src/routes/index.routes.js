const express = require('express');
const router = express.Router();

router.use('/', require('./main.routes'))
router.use('/users', require('./user.routes'));
router.use('/products', require('./products.routes'));


module.exports = router;