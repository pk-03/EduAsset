const router = require('express').Router();
const nodemailer = require('nodemailer');
const key = require('./../config/key.js').mail;

router.post('/mail',(req,res)=>{
var user = req.body.email;

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: key.user,
        pass: key.pass
    }
}); 

const mailOptions = {
  from: 'eduassetsinfo@gmail.com', // sender address
  to: 'contacteduassets@gmail.com', // list of receivers
  subject: 'Sending of the mail through nodeJS', // Subject line
  html: `<p>This is a simple to test for the nodemailer...... 
  
  ${user}
  </p>`// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
    console.log('Mail sent..',info);
    req.flash('success_msg','Thanks For Connecting With Us....');
    res.redirect('/');
});

});

module.exports = router;