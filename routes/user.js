const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/signup',(req,res)=>{
    res.render('signup');
});
 
router.get('/login',(req,res)=>{
    res.render('login');
});

router.post('/register',(req,res)=>{
    const {name, email , password , password2 ,phone,college} = req.body;
    let  errors = [];

    if(!name || !email || !password || !password2 || !phone || !college){
        errors.push({msg:'All fields required..'})
        console.log(errors);
    }
    if(password !== password2){
        errors.push({msg:'Password does not match .. Please Register Again..'})
        console.log(errors);  
    }
    
    if(errors.length > 0 ){
        res.render('signup',{
            errors,name,email,password,phone,college
        })

        console.log(errors);
        // new User({name,email,password}) 
    }
    else{  
        User.findOne({'email':email,'phone':phone}).then((user)=>{
            if(user){
                console.log("This email id  ");
                errors.push({msg:'This email id OR Phone number is already registered'})
                res.render('signup',{
                    errors,name,email,password,phone,college
                });
            }
            else{
            const newUser = new User({name,email,password,phone,college});
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    console.log('encrypted...',hash); 
                    newUser.password = hash;

                    newUser.save().then((user)=>{
                        console.log('User saved to database',newUser);
                        req.flash('success_msg','You are successfully registered and can login');
                        res.redirect('/login')
                    })
                    .catch(err => console.log(err));
                })
            })
          } 
        })
    }
});


router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',   
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next)
})

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You have successfully logged out...');
    res.redirect('/login');
    
})

module.exports = router;