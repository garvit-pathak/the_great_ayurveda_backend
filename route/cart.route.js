const express = require("express");
const cartControl = require("../controller/cart.controller");
const cartRouter = express.Router();
const tokenVerify = require('../middleware/authVerify')


cartRouter.post("/add", cartControl.Add);
cartRouter.post("/view",cartControl.View);
cartRouter.post("/delete", cartControl.Delete);
cartRouter.post("/remove", cartControl.RemoveItems);

module.exports = cartRouter;
