const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appointmentSchema =  new mongoose.Schema({
    patientName :{
        type : String ,
        required : true 
    },
    age : {
        type : String ,
        required : true 
    },
    disease:{
        type : String ,
        required : true 
    },
    mobile :{
        type : Number,
        required: true 
    },
    date:{
        type:String,
        required:true
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref : "users"
    },
    doctor :{
        type : Schema.Types.ObjectId,
        ref : "doctors"
    },
    apointmentStatus: {
        type : String,
        default:"pending" 
    }
});
module.exports = mongoose.model("appointments",appointmentSchema);