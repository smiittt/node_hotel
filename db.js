const mongoose = require("mongoose");
  
// define mongoDB connection URL
const url = "mongodb://localhost:27017/hotel";

// connect to mongoDB
mongoose.connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

//Making briddge bwtween mongoDB and Node and it is maintaind connections objr=ect 
const conn = mongoose.connection;

//Define event listener for database connection 

// "connected" , "error" , "disconnected" >> this are event listner keywords which already knows by mongoDB
 
conn.on('connected' , ()=> {
    console.log('connected to database');
})
conn.on('erroe' , (err) => {
    console.log('error in database connection' , err);
})
conn.on('disconnected' , ()=> {
    console.log('disconnected from database');
})


//experting db connection so we can inherit to another file
module.exports = conn;