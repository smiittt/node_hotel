const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config()
const passport = require('./auth') // importing auth.js (Authentication logic)

const bodyparser = require("body-parser");
app.use(bodyparser.json());

// Middleware Function & printing logs
const logReq =  (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] ----->  Request made on ${req.originalUrl}`)
  next()
}
app.use(logReq) 
//middleware end

app.use(passport.initialize()) // implementing authentication
const auth_middle = passport.authenticate('local' , {session:false}) 
// app.use(auth_middle)

app.get("/" ,auth_middle,function (req, res) { // auth_middle using as a middleware
  res.send("Hello, Welcome to hotel!!!");
});


// importing person routes
const personroutes = require("./routes/personRoutes");
const menurouter  = require("./routes/menuRoutes");
const person = require("./models/Person");
// defineing for use person routes
app.use("/",auth_middle, personroutes);
app.use("/"  ,auth_middle,menurouter);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Hello Smit, Your server is running smoothly!!");
});
 