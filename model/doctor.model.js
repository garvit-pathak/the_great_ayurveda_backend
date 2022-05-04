const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const doctorSchema = new mongoose.Schema({
 name :{
     type : String ,
     required : true 
 },
 email :{
     type : String ,
     required : true ,
     unique: true 
 },
 password:{
     type : String ,
     required : true 
 },
 image : {
     type : String ,
     required : true 
 },
 mobile :{
     type : Number,
     required: true 
 },
 isApproved :{
     type : Boolean,
     default: false
 },
 exprience : {
     type : Number,
     required : true 
 },
  degree :{
      type : String ,
      required : true 
  },
  category :{
      type : Schema.Types.ObjectId,
      ref: "categories"
  },
  otp:{
      type : Number,
      required : true 
  },
  isverfied:{
      type : Boolean,
      default: false
  } ,
  specialities:{
      type : String ,
      required : true 
  },
  clinicName :{
      type : String ,
      required : true 
  },
  clinicAddress:{
      type : String ,
      required : true 
  },
  clinicNo :{
      type : Number,
      required : true 
  },
  clinicTiming :{
    type : String ,
    required : true 
  },
  reviewerDetail:[{
   type : Schema.Types.ObjectId,
   ref : "users"
 }],
 review : [{
     type : String,
 }]
  
});
module.exports = mongoose.Schema("doctors",doctorSchema);