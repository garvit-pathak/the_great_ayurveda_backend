const express=require('express');
const cartControl=require('../controller/cart.controller');
const cartRouter=express.Router();

cartRouter.post('/add',cartControl.Add);
cartRouter.get('/view',cartControl.View);
cartRouter.get('/delete',cartControl.Delete);
cartRouter.get('/remove',cartControl.RemoveItems);

module.exports=cartRouter;