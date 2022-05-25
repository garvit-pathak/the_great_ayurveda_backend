const mongoose = require("mongoose");
const querySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
});
module.exports = mongoose.model("queries", querySchema);