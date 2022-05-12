const express = require('express');
const orderControl=require('../controller/order.controller');

const orderRouter=express.Router();

orderRouter.post('/placeorder',orderControl.PlaceOrder);

orderRouter.get('/vieworder',orderControl.ViewPlacedOrder);
orderRouter.post('/deliverystatus',orderControl.DeliveryStatusUpdate);
orderRouter.get('/deliveredordered',orderControl.DeliveredOrders);
orderRouter.post('/trackorder',orderControl.TrackOrder);
orderRouter.post('/cancelorder',orderControl.CancelOrder);

module.exports=orderRouter;