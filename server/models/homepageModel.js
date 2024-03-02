const mongoose = require("mongoose");


const homepageSchema = new mongoose.Schema({

    image:{
       
         public_id:{
             type:String,
             required:true
         },
         url:{
             type:String,
             required:true
         }
       
    },
 
});



module.exports = mongoose.model("Homepage", homepageSchema);