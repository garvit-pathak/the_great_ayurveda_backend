const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;
const orderSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref:'users'
    },
    medicineList :[{
        medicines:{
            type :  Schema.Types.ObjectId,
            ref : "medicines"
        },
        price:{
            type:Number,
            required:true
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
        type : String,
        required:true 
    },
    mobile:{
        type :  Number ,
        required : true 
    },
    address :{
        type : String ,
        required : true 
    },
    delivery :{
        type :  String ,
        default : "pending"
    },
    orderStatus:{
        type:String,
        default: "unordered"
    },
    paymentId :{
        type :  String ,
        required :  true 
    }

});
module.exports = mongoose.model("orders",orderSchema);