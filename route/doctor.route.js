const express = require('express');
const doctorRouter = express.Router();
const doctorController=require('../controller/doctor.controller');

const multer=require('multer');

const storage=multer.diskStorage({
    destination:'public/images',
    filename:(request,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});


doctorRouter.post('/add',upload.single('image'),doctorController.addDoctor);
doctorRouter.post('/review',doctorController.review);
doctorRouter.get('/viewAllDoctor',doctorController.viewAllDoctor);
doctorRouter.get('/viewOneDoctor',doctorController.viewOneDoctor);
doctorRouter.get('/viewByName',doctorController.viewByName);
doctorRouter.get('/viewByCat',doctorController.viewByCat);
doctorRouter.delete('/deleteDoctor',doctorController.deleteDoctor);
doctorRouter.post('/updateDoctor',doctorController.updateDoctor);

module.exports=doctorRouter;