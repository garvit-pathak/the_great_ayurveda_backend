const express = require("express");
const orderControl = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.post("/create", orderControl.create);

orderRouter.get("/vieworder", orderControl.ViewPlacedOrder);
orderRouter.post("/viewOrderByUserId", orderControl.viewOrderByUserId);
orderRouter.post("/deliverystatus", orderControl.DeliveryStatusUpdate);
orderRouter.post("/place", orderControl.place);
orderRouter.post("/trackorder", orderControl.TrackOrder);
orderRouter.post("/cancelorder", orderControl.CancelOrder);
orderRouter.post("/create", orderControl.create);


orderRouter.post("/payment", orderControl.payOnline);

module.exports = orderRouter;