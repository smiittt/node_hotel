const express = require("express");
const app = express();
const db = require("./db");

const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.send("Hello, Welcome to hotel!!!");
});



// importing person routes
const personroutes = require("./routes/personRoutes");
const menurouter  = require("./routes/menuRoutes")
// defineing for use person routes
app.use("/", personroutes);
app.use("/" , menurouter);



app.listen(3000, () => {
  console.log("Hello Smit, Your server is running smoothly!!");
});
