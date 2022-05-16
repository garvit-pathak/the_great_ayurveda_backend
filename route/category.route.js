const express = require("express");
const categoryController = require("../controller/category.controller");

const categoryRouter = express.Router();


categoryRouter.post('/add'
                 ,categoryController.Add);
categoryRouter.get('/view',categoryController.View);
categoryRouter.post('/viewone',categoryController.ViewOne);
categoryRouter.post('/delete',categoryController.Delete);
categoryRouter.post('/update',categoryController.Update);
module.exports = categoryRouter;

