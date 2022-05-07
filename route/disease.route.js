// const express = require('express');
// const diseaseController= require('../controller/disease.controller');
// const diseaseRouter= express.Router();
// const multer=require('multer');

// const storage=multer.diskStorage({
//     destination:'public/images',
//     filename:(request,file,cb)=>{
//         cb(null,Date.now()+'_'+file.originalname);
//     }
// });

// const upload=multer({storage:storage});
// diseaseRouter.post('/add-disease',upload.single('image'),diseaseController.Add);

// module.exports =diseaseController;