// authRoutes
const express = require('express');
const { register, login, update, profile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/profile", authMiddleware, update)
router.get("/profile", authMiddleware, profile)

module.exports = router;