const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true 
    }
});
module.exports = mongoose.model("categories",categorySchema);