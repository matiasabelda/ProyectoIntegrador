const controladorMain = require('../controllers/mainController')

const express = require('express');
const router = express.Router();

router.get('/', controladorMain.home);
router.get('/search', controladorMain.search); 

module.exports = router;