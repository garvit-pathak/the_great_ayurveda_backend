const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
const diseaseSchema  = new mongoose.Schema({
    name :{
        type : String,
        required:true  
    },
    causes:{
        type : String ,
        required : true 
    },
    homeRemedies :{
        type : String ,
    
    },
    yogaLink:{
        type : String 
    },
    yogaThumbnail:{
        type : String 
    },
    image :{
        type : String ,
        required : true 
    },
    keyword :{
        type : String ,
        required : true 
    },
    medicines:[{
        type : Schema.Types.ObjectId,
        required : true 
    }],
    category :{
        type : Schema.Types.ObjectId,
        ref : "categories"
    } ,
    reviewerDetail :[{
        uId:{type:Schema.Types.ObjectId,ref : 'users'},       
        reviewText:String,      
      }]
});


module.exports = mongoose.model("diseases",diseaseSchema);