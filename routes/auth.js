const express = require('express');
const { registerUser, loginUser, logoutUser, loginValidation } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginValidation, loginUser);
router.get('/logout', logoutUser);

module.exports = router;
