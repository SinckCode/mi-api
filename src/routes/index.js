const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.post('/deploy', mainController.deploy);

module.exports = router;
