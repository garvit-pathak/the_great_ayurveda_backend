const express=require('express');
const appointmentRouter=express.Router();
const appointmentController=require('../controller/appointment.controller');

appointmentRouter.post('/bookappointment',appointmentController.BookAppointment);
appointmentRouter.post('/doctorResponseaccept',appointmentController.DoctorResponseAccept);
appointmentRouter.post('/doctorResponsereject',appointmentController.DoctorResponseReject);
appointmentRouter.get('/viewappointment',appointmentController.ViewAppointment);


module.exports=appointmentRouter;