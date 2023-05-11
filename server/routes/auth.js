const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../sqlConnection');


router.use(passport.initialize());
router.use(passport.session());




router.get('/', (req, res) => {
    res.send('Hello, world! App route');
    
});

// Use Passport.js to authenticate the user
router.post('/login', passport.authenticate('local', { successRedirect: '/notes', failureRedirect: '/', failureFlash: true, }), (req, res, next) => { next()});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
