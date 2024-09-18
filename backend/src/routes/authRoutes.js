const express = require('express');
const { register, login, updateUserName } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put("/profile/update-name", updateUserName)

module.exports = router;