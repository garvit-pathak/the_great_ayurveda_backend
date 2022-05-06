const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    userId:{
        type : Schema.Types.ObjectId,
        ref:'users'
    },
    medicineList :[
        {type:Schema.Types.ObjectId , ref:'medicines'}
    ]
});
module.exports = mongoose.model("carts",cartSchema);