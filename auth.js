const passport = require('passport')        
const local_passport_stratagy =require('passport-local').Strategy
const person = require('./models/Person')


passport.use(new local_passport_stratagy(async (recived_username ,recived_password ,done )=>{
    //authentication logic 
    try {
    //   console.log('Recived credintials : ' , recived_username , recived_password)
      const user = await person.findOne({username: recived_username})
  
      if(!user)
        return done(null , false , {message : "User not found"})
  
      const is_password_matches = user.comparePassword(recived_password)
      if (is_password_matches) {
        return done(null,user)
      } else {
        return done(null, false , {message : "Incorrect password"})
      }
    } catch (error) {
      return done(error)
    }
  }))

  module.exports = passport