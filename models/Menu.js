const mongoose = require("mongoose");

const hotelMenuSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
   price:{
    type: Number,
    required: true
   },
   teste:{
    type: String,
    enum: ['sweet' , 'spicy' , 'sour'],
    required:true
   },
   is_drink:{
    type: Boolean,
    default:false
   },
   ingrediants:{
    type: [String],
    default:[]
   },
   num_sales:{
    type: Number,
    default:0
   }
  

});

const menuitem = mongoose.model('Menu' , hotelMenuSchema)
module.exports = menuitem; 
