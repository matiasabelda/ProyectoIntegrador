const controladorMain = require('../controllers/mainController')

const express = require('express');
const router = express.Router();

router.get('/', controladorMain.home);
router.get('/search', controladorMain.search)
router.get('/documentacionApis', controladorMain.documentacionApis); 

module.exports = router;