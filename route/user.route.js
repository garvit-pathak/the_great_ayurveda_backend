const express=require('express');
const multer=require('multer');

const storage=multer.diskStorage({
    destination:"public/images",
    filename:(request,file,cb)=>{
        cb(null,Date.now()+'_'+file.originalname);
    }
});

const upload=multer({storage:storage});

const userRouter=express.Router();
const userController=require('../controller/user.controller');

userRouter.post('/signup',upload.single('image'),userController.SignUp);
userRouter.post('/verify',userController.Verify);
userRouter.get('/verified',userController.IsVerified);
userRouter.post('/signin',userController.SignIn);
userRouter.get('/remove',userController.Remove);
userRouter.get('/view',userController.View);

module.exports=userRouter;
