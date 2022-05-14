const appointmentM = require('../model/appointment.model');
const fastTwoSms = require('fast-two-sms');


exports.BookAppointment = (request, response) => {
    let patientName = request.body.patientName;
    let age = request.body.age;
    let disease = request.body.disease;
    let mobile = request.body.mobile;
    let userId = request.body.userId;
    let doctorId = request.body.doctorId;
    let date = request.body.date;
    // let date = new Date();
    // let b = date.getDate();
    // let c = date.getMonth() + 1;
    // let d = date.getFullYear();
    // let currentDate = b + '/' + c + '/' + d
    // console.log(currentDate);

    appointmentM.create({ patientName: patientName, age: age, disease: disease, mobile: mobile, userId: userId, doctor: doctorId, date: date }).then(result => {
        var options = {
            authorization: "FtQi9Z8SXlC5rq1VdNjsKREuO7wWTmnc6zvbI0eJHYLfohMAUxL5mucn6aw1PpNosir4G8gyJzRFEeYj",
            message: 'Dear customer we have received your appointment request Date:' + currentDate + ' soon doctor will contact you , Team:The Great Ayurveda',
            numbers: [mobile]
        }
        fastTwoSms.sendMessage(options).then(result => {
            console.log(result);
            return response.status(200).json(result);
            

        }).catch(err => {
            console.log(err);
            return response.status(500).json({ message: "error" });
        });

    })
}




exports.DoctorResponseAccept = (request, response) => {
    appointmentM.updateOne({ _id: request.body.aId }, { $set: { apointmentStatus: 'Accepted' } }).then(result => {
        if (result.modifiedCount && result.matchedCount) {
            return response.status(200).json({ result: result, message: 'Appointment accepted' });
        } else {
            return response.status(404).json({ result: result, message: 'Appointment not accepted' });
        }


    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Not Updated' });

    });
}

exports.ViewAppointment = (request, response) => {
    appointmentM.find().then(result => {
        return response.status(201).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot fetch data' });
    })
}
exports.DoctorResponseReject = (request, response) => {
    appointmentM.updateOne({ _id: request.body.aId }, { $set: { apointmentStatus: 'Rejected' } }).then(result => {
        if (result.modifiedCount && result.matchedCount) {
            return response.status(200).json({ result: result, message: 'Appointment Rejected' });
        } else {
            return response.status(404).json({ result: result, message: 'Appointment not rejected' });
        }
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Not Updated' });

    });
}
