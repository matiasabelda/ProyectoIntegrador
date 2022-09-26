const controladorPerfil = require('../controllers/perfilControllers')

const express = require('express');
const router = express.Router();

router.get('/', controladorPerfil.perfil);

module.exports = router;