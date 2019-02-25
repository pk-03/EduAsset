const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
const User = require('./../models/user');

router.get('/google',
    passport.authenticate('google',{ scope: ['profile email'] })
);

router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),
    (req,res)=>{
        res.redirect('/dashboard');  
    });

module.exports = router;    