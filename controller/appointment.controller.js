const appointmentM=require('../model/appointment.model');

exports.BookAppointment=(request,response)=>{
    let patientName=request.body.patientName;
    let age=request.body.age;
    let disease=request.body.disease;
    let mobile=request.body.mobile;
    let userId=request.body.userId;
    let doctorId=request.body.doctorId;

    appointmentM.create({patientName:patientName,age:age,disease:disease,mobile:mobile,userId:userId,doctor:doctorId}).then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not saved'});
    });
}