const express =require('express');
const medicineRouter=express.Router();
const medicineControl=require('../controller/medicine.controller');
const multer=require('multer');


const storage=multer.diskStorage({
    destination:'public/images',
    filename:(request,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});

medicineRouter.post('/add',
                    upload.single('image'),medicineControl.Add);
medicineRouter.post('/review',medicineControl.Review);
medicineRouter.get('/viewall',medicineControl.ViewAll);
medicineRouter.get('/viewbypro',medicineControl.ViewByProduct);
medicineRouter.get('/viewbycat',medicineControl.ViewByCat);
medicineRouter.get('/delete',medicineControl.Delete);
medicineRouter.post('/update',upload.single('image'),medicineControl.Update);

module.exports=medicineRouter;