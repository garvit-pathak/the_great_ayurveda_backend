const express=require('express');
const appointmentRouter=express.Router();
const appointmentController=require('../controller/appointment.controller');

appointmentRouter.post('/bookappointment',appointmentController.BookAppointment);

module.exports=appointmentRouter;