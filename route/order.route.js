const express = require("express");
const orderControl = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.post("/create", orderControl.create);

orderRouter.get("/vieworder", orderControl.ViewPlacedOrder);
orderRouter.post("/deliverystatus", orderControl.DeliveryStatusUpdate);
orderRouter.get("/deliveredordered", orderControl.DeliveredOrders);
orderRouter.post("/trackorder", orderControl.TrackOrder);
orderRouter.post("/cancelorder", orderControl.CancelOrder);
orderRouter.post("/razorpayorder", orderControl.RazorPayOnlinePayment);

module.exports = orderRouter;
