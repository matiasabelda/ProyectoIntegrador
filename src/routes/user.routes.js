const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.login);
router.get('/perfil', userController.perfil);
router.get('/register', userController.registro);

module.exports = router;