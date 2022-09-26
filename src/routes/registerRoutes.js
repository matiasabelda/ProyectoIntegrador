const controladorRegister = require('../controllers/registerControllers')

const express = require('express');
const router = express.Router();

router.get('/', controladorRegister.registro);

module.exports = router;