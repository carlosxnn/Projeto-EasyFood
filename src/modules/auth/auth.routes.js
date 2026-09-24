const express = require('express');
const AuthController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, AuthController.getMe);

module.exports = router;