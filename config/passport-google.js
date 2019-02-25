const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./../models/user');
const keys = require('./key');



passport.serializeUser((user,done)=>{
  done(null,user.id);
})

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user)
  })
})

passport.use(
    new GoogleStrategy({        
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientsecret,
    callbackURL: '/auth/google/callback',
    },(accessToken, refreshToken, profile, done)=>{
        console.log('callback function....');
        // console.log('Profile USers',profile);
     User.findOne({googleId:profile.id}).then((user)=>{
      if(user){
        console.log('user is already created before..')
        return done(null,user);

      }else{
        console.log('this is a new user ...');
        new User({
            googleId:profile.id,
            name:profile.displayName,
            email:profile.emails[0].value,
            password:'Sign in with google',
            phone:'000000000',
            college:'Sign in with google'

            
        }).save().then((user)=>{
            console.log('User saved to the db'+user);
            done(null,user);
        })


      }   
     })   


    })

)


// module.exports = passport;