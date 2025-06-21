const express = require('express');
const router = express.Router();
const { register, login, getMe , ping } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect , getMe);
router.get('/ping/pong' ,ping);
module.exports = router;