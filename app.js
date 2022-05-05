const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const port=process.env.PORT || 8800;
app.use(cors());
const adminRouteImport=require('./route/admin.route');


mongoose
.connect("mongodb+srv://root:root@ayurvedacluster.oihsu.mongodb.net/theGreatAyurveda?retryWrites=true&w=majority")
.then(()=>{
console.log("database conectivity success ");
})
.catch((err)=>{
    console.log(" database connectivity failed"+err);
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/admin/',adminRouteImport);

app.listen(port,()=>{
    console.log('Server Running');
});