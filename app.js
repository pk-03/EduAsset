const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.js');
const mailerRoutes = require('./routes/mailer.js');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express(); 
const user = require('./models/user')
const db = require('./config/key').mongoURI;
require('./config/passport')(passport);
require('./config/passport-google') 

var port = process.env.PORT || 3000 ; 

app.use(express.static('public'));
   
app.set('view engine','ejs');

//body parser
app.use(express.urlencoded({extended:true})); 

app.use(session({
    secret:'secret',
    resave:true,  
    saveUninitialized : true 
}));  

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
 
mongoose.connect(db,{useNewUrlParser:true}) 
.then(()=>console.log('mongodb connected...'))
.catch((e)=>console.log('Some error encounter',e));


app.use(flash());
 
// global var
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next(); 
})
 
app.get('/dashboard',(req,res)=>{
    res.render('dashboard',{name:req.user.name});
});

app.get('/',(req,res)=>{
res.render('index') 
});   

app.get('/aboutus',(req,res)=>{
res.render('aboutus') 
});

app.use('/',userRoutes)

app.use('/',mailerRoutes)

app.use('/auth',authRoutes);

app.use('/',courseRoutes);


app.listen(port,()=>{
    console.log(`Application up on port ${port}`)
}); 