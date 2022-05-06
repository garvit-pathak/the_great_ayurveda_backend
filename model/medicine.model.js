const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const medicineSchema= new mongoose.Schema({
    name:{
        required : true ,
        type : String 
    },
    price :{
        type : String ,
        required : true 
    },
    description :{
        type : String ,
        required : true 
    },
    stock:{
        type :Number ,
        required : true 
    },
    image :{
        type : String ,
        required  :true 
    },
    keyword :{
        type: String ,
        required : true 
    },
    category :{
        type : Schema.Types.ObjectId,
        ref : "categories"
    },
    reviewerDetail :[{
      uId:{type:Schema.Types.ObjectId,ref : 'users'},       
      reviewText:String,      
    }],
});
module.exports = mongoose.model("medicines",medicineSchema);