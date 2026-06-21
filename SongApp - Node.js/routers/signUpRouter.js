const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => {
    res.render('login',{ errorMessage: undefined });
});
router.post('/login', authController.loginUser);
router.get('/register', (req, res) => {
    res.render('register',{ errorMessage: undefined });
});
router.post('/register', authController.registerUser);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

module.exports = router;