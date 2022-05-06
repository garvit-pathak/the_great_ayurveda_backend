const mongoose =  require("mongoose");
const querySchema = new mongoose.Schema({
    email:{
       type : String,
       required: true
    },
    query:{
        type:String ,
        required : true 
    },
    status : {
        type : String ,
        default : 'pending'
    },
    mobile :{
        type : Number ,
        required : true 
    }
})
module.exports = mongoose.model("queries",querySchema);