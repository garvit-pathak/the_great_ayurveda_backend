const express=require('express');
const queryControl=require('../controller/query.controller');
const queryRouter=express.Router();

queryRouter.post('/sendquery',
                           queryControl.SendQuery);
queryRouter.post('/updatequery',queryControl.Resolve);
queryRouter.post('/checkquery',queryControl.Check);

module.exports=queryRouter;