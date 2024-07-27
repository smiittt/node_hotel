const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require('bcrypt')

const personschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  occupassion: {
    type: String,
    enum: ["businessman", "manager", "employee", "student"],
  },
  mobileNO: {
    type: Number,
  },
  Salary: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personschema.pre('save' , async function(next){
  const person =this

  // Hash the password only if it has been modified (or it is new)
  if(!person.isModified('password')) return next()

  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10)

    //hash password
    const hashpassword = await bcrypt.hash(person.password,salt)

    //override the plain password with the hashed one
    person.password = hashpassword

    next()
  } catch (error) {
    return next(error)
  }
})

personschema.methods.comparePassword = async function(candidatePassword){
  try {
    // using bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword , this.password)
    return isMatch
  } catch (error) {
    throw error
  }
}
// creating person model
const person = mongoose.model("person", personschema);
module.exports = person;
