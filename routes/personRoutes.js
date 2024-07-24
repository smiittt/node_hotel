const express = require("express");
const router = express.Router();

const person = require("./../models/Person");

//POST route to add a person
router.post("/person", async (req, res) => {
  try {
    const data = req.body; // Assuming the req body contains the person data
    const newData = new person(data); // create a newperson document using mongoose model

    const DataSaved = await newData.save();
    console.log("Data stored successfully");
    res.status(200).json(DataSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//fatching all person details from db
router.get("/person", async (req, res) => {
  try {
    const data = await person.find();
    console.log("All person data fatched successfully ");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error in fatching data"});
  }
});

//fatching businessman,manager,employee...
router.get("/person/:worktype", async (req, res) => {
  try {
    const personworktype = req.params.worktype;
    if (
      personworktype == "businessman" ||
      personworktype == "manager" ||
      personworktype == "employee" ||
      personworktype == "student"
    ) {
      const response = await person.find({ occupassion: personworktype });
      console.log("All person data fatched successfully from database");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error in fatching person"});
  }
});

router.put('/person/:id', async (req, res) => {
  try {
    const person_id = req.params.id;
    const updatedperson = req.body;

    const response = await person.findByIdAndUpdate(person_id, updatedperson, {
      new: true,
      runValidators: true,
    })

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }

    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.delete('/person/:id' , async (req,res)=>{
  try {
    const person_id = req.params.id
    const response = await person.findByIdAndDelete(person_id)

    if(!response){
      return res.status(404).json({error: "person not found" })
    }
    console.log("person deleted successfully")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Internal server error" })

  }
})

module.exports = router;
