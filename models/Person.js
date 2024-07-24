const mongoose = require("mongoose");

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
});


// creating person model
const person = mongoose.model("person", personschema);
module.exports = person