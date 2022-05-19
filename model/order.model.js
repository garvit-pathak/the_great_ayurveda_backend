const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    medicineList: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "products",
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
    }, ],
    date: {
        type: Date,
        default: Date.now,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    amount: Number,
    delivery: {
        type: String,
        default: "pending",
    },
    orderStatus: {
        type: String,
        default: "unordered",
    },
});
module.exports = mongoose.model("orders", orderSchema);