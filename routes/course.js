const router = require('express').Router();
const {ensureAuthenticated} = require('./../config/isAuthen');
 
router.get('/courses',ensureAuthenticated,(req,res)=>{
    res.redirect('/dashboard');
}); 

module.exports = router;