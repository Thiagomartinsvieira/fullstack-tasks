const express = require('express');
const { register, login, update, profile, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/profile", authMiddleware, update)
router.get("/profile", authMiddleware, profile)
router.delete("/profile", authMiddleware, deleteUser)

module.exports = router;