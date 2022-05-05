const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true 
    },
    password : {
        type: String ,
        required : true 
    },
    image:{
        type : String,
        required : true
    },
    mobile:{
      type: Number,
      required : true 
    }
});
module.exports = mongoose.model("admins",adminSchema);