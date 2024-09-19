// authRoutes
const express = require('express');
const { register, login, update } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/profile", authMiddleware, update)

module.exports = router;