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
medicineRouter.post('/viewbypro',medicineControl.ViewByProduct);
medicineRouter.post('/viewbycat',medicineControl.ViewByCat);
medicineRouter.post('/delete',medicineControl.Delete);
medicineRouter.post('/update',upload.single('image'),medicineControl.Update);
medicineRouter.post('/search',medicineControl.viewByKeyword);
medicineRouter.post('/excel',medicineControl.ExcelSave);
module.exports=medicineRouter;