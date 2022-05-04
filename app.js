const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose
.connect("mongodb+srv://root:root@ayurvedacluster.oihsu.mongodb.net/theGreatAyurveda?retryWrites=true&w=majority")
.then(()=>{
console.log("database conectivity success ");
})
.catch((err)=>{
    console.log(" database connectivity failed"+err);
});