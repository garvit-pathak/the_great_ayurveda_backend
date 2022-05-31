const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controller/appointment.controller");
const tokenVerify = require('../middleware/authVerify')

appointmentRouter.post("/bookappointment", appointmentController.BookAppointment);
appointmentRouter.post("/viewAppoimentByUid", appointmentController.viewAppointmentByUid);


appointmentRouter.post("/doctorResponseaccept", appointmentController.DoctorResponseAccept);
appointmentRouter.post("/doctorResponsereject", appointmentController.DoctorResponseReject);

appointmentRouter.post("/viewAppoimentByDid", appointmentController.viewAppointmentByDid);
appointmentRouter.post("/viewAppointmentByDidPending", appointmentController.viewAppointmentByDidPending);

appointmentRouter.get("/viewappointment", appointmentController.ViewAppointment);

appointmentRouter.post("/acceptAppointment", appointmentController.acceptAppointment);
appointmentRouter.post("/cancleAppointment", appointmentController.cancleApppoinment);

module.exports = appointmentRouter;