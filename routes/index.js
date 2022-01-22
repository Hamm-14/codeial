const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users.js'));

//for further routes access from home('/')
//router.use('/routerName',require('./routerFile'));

module.exports = router;