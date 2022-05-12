const express = require('express');
const categoryController = require('../controller/category.controller');


const categoryRouter = express.Router();

categoryRouter.post('/add'
                 ,categoryController.Add);
categoryRouter.get('/view',categoryController.View);
categoryRouter.get('/viewone',categoryController.ViewOne);
categoryRouter.get('/delete',categoryController.Delete);
categoryRouter.post('/update',categoryController.Update);
module.exports = categoryRouter;