const express = require("express");
const router = express.Router();

const menuitem = require("./../models/Menu");

//creating menu and adding in db
router.post("/menuitem", async (req, res) => {
  try {
    const menu = req.body;
    const newmenu = new menuitem(menu);

    const menudatasaved = await newmenu.save();
    console.log("Menu has been created successfully!!");
    res.status(200).json(menudatasaved);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "Internal server error in creating menu");
  }
});

//fatching all menu details
router.get("/menuitem", async (req, res) => {
  try {
    const data = await menuitem.find();
    console.log("All menus are fatched successfully !!!");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "Internal server error in fatching menu");
  }
});

// fatching sweets,spicy ...
router.get("/menuitem/:menutype", async (req, res) => {
  try {
    const menutestefilter = req.params.menutype;

    if (
      menutestefilter == "sweet" ||
      menutestefilter == "spicy" ||
      menutestefilter == "sour"
    ) {
      const response = await menuitem.find({ teste: menutestefilter });
      console.log("All menu data fatched successfully from databse");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "internal server error in fatching data");
  }
});

//update
router.put("/menuitem/:id", async (req, res) => {
  try {
    const perameter = req.params.id;
    const data = req.body;

    const response = await menuitem.findByIdAndUpdate(perameter, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "menu not found" });
    }
    console.log("Menu updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "internal server error ");
  }
});

// delete
router.delete('/menuitem/:id' , async (req,res)=>{
  try {
    const perameter = req.params.id

    const response = await menuitem.findByIdAndDelete(perameter)

    if(!response){
      res.status(404).json({error:"menu not found" })
    }
    console.log("menu deleted")
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error, "internal server error ")
  }
})  

module.exports = router;
