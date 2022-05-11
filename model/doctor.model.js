const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    exprience: {
        type: Number,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    },
    otp: {
        type: Number,
    },
    isverfied: {
        type: Boolean,
        default: false
    },
    specialities: {
        type: String,
        required: true
    },
    clinicName: {
        type: String,
        required: true
    },
    clinicAddress: {
        type: String,
        required: true
    },
    clinicNo: {
        type: Number,
        required: true
    },
    clinicTiming: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    reviewerDetail: [{
        uId: { type: Schema.Types.ObjectId, ref: 'users' },
        reviewText: String,
    }],

});
module.exports = mongoose.model("doctors", doctorSchema);