const controladorMain = require('../controllers/mainControllers')

const express = require('express');
const router = express.Router();

router.get('/', controladorMain.home);
router.get('/search', controladorMain.search); 

module.exports = router;