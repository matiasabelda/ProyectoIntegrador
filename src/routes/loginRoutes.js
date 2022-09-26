const controladorLogin = require('../controllers/loginControllers')

const express = require('express');
const router = express.Router();

router.get('/', controladorLogin.login);

module.exports = router;
