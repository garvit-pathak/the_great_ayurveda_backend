const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;
const orderSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId
    },
    medicineList :[{
        medicines:{
            type :  Schema.Types.ObjectId,
            ref : "medicines"
        },
        total : {
            type : Number,
            required: true 
        },
        quantity :{
            type : Number,
            required : true 
        }
    }],
    date:{
        type : Date,
        default : Date.now 
    },
    mobile:{
        type :  Number ,
        required : true 
    },
    address :{
        type : String ,
        required : true 
    },
    dilevery :{
        type :  String ,
        default : "pending"
    },
    paymentId :{
        type :  String ,
        required :  true 
    }

});
module.exports = mongoose.model("orders",orderSchema);