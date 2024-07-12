const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateJson = require('../middlewares/validateJson');

// Login route
router.post('/login', validateJson, authController.login);
router.post('/register', validateJson, authController.register);
router.post('/logout', authController.logout);

module.exports = router;
