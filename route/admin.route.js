const express = require('express');
const adminController = require('../controller/admin.controller');
const adminRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (request, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

adminRouter.post('/signup',
    upload.single('image'), adminController.SignUp);
adminRouter.post('/signin',
    adminController.SignIn);
adminRouter.post('/update', upload.single('image'), adminController.Update);

adminRouter.post('/isApproved', adminController.isApproved)

module.exports = adminRouter;