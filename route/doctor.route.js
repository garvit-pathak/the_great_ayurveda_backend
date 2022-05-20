const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controller/doctor.controller");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: "public/images",
    filename: (request, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });

doctorRouter.post("/signin", doctorController.signin);
doctorRouter.post("/add", upload.single("image"), doctorController.addDoctor);
doctorRouter.post("/viewReviewbyDid", doctorController.ViewReviewByDid);
doctorRouter.post("/verifyDoctor", doctorController.verify);
doctorRouter.post("/review", doctorController.review);
doctorRouter.get("/viewAllDoctor", doctorController.viewAllDoctor);
doctorRouter.post("/viewOneDoctor", doctorController.viewOneDoctor);
doctorRouter.post("/viewByKeyword", doctorController.viewByKeyword);
doctorRouter.post("/viewByCat", doctorController.viewByCat);
doctorRouter.post("/deleteDoctor", doctorController.deleteDoctor);
doctorRouter.post(
    "/updateDoctor",
    upload.single("image"),
    doctorController.updateDoctor
);
doctorRouter.post("/excel", doctorController.ExcelUpload);
doctorRouter.post('/removereview', doctorController.RemoveReview);
// doctorRouter.post("/approvedoctor",doctorController.ApproveDoctor);
// doctorRouter.post("/rejectdoctor",doctorController.RejectDoctor);

module.exports = doctorRouter;