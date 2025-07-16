const express = require('express');
const router = express.Router();
const { hello } = require('../controllers/mainController');

router.get('/', hello); // http://localhost:3000/api/

module.exports = router;
