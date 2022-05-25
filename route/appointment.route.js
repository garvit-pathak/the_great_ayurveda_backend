const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controller/appointment.controller");

appointmentRouter.post(
    "/bookappointment",
    appointmentController.BookAppointment
);
appointmentRouter.post(
    "/doctorResponseaccept",
    appointmentController.DoctorResponseAccept
);
appointmentRouter.post(
    "/doctorResponsereject",
    appointmentController.DoctorResponseReject
);
appointmentRouter.get(
    "/viewappointment",
    appointmentController.ViewAppointment
);
appointmentRouter.post("/acceptAppointment", appointmentController.acceptAppointment);
appointmentRouter.post("/cancleAppointment", appointmentController.cancleApppoinment);
appointmentRouter.post("/viewAppoimentByDid", appointmentController.viewAppointmentByDid);
appointmentRouter.post("/viewAppoimentByUid", appointmentController.viewAppointmentByUid);
module.exports = appointmentRouter;