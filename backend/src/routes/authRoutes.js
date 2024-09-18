// authRoutes
const express = require('express');
const { register, login, updateUserName } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/profile", authMiddleware, updateUserName)

module.exports = router;