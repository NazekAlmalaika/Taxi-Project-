
const mongoose= require('mongoose');
const passport = require('passport');
require('../models/user');



const localStrategy = require('passport-local').Strategy;

/*passport.serializeUser(function(user,done){
  done(null, user.id);
});
passport.deserializeUser(function(id,done){
  user.findById(id,function(err,user){
    done(err,user);
  });
});*/
var user= mongoose.model('User');

passport.use(
  new localStrategy ({ usernameField: 'email'},
  (name, password , done)=>{
    user.findOne({email: name}, 
     (err,user)=>{
      if (err){
        return done(err);
      }
          if(!user){
            return done(null, false, {message: 'Email is not registered'});
          }
          else if(!user.verifyPassword(password)){
            return done(null, false, {message: 'Wrong Password'});
          }
        else
            return done(null, user);
  
          });
  
    }));
 