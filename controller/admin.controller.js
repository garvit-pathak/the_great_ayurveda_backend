const adminM = require('../model/admin.model');
const path = require('path');
const doctor = require('../model/doctor.model')
const jwt = require('jsonwebtoken');

const { Storage } = require('@google-cloud/storage');
const { request } = require('http');
const { response } = require('express');
let bucketName = "gs://ayurveda-d6cac.appspot.com"

const storage = new Storage({
    keyFilename: "serviceFirebaseStorage.json"
});

const uploadFile = async(filename) => {

    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "saved-image"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.SignUp = (request, response) => {

    let a = request.body.name;
    let b = request.body.email;
    let c = request.body.password;
    let d = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=saved-image';
    let e = request.body.mobile;


    adminM.create({ name: a, email: b, password: c, image: d, mobile: e }).then(result => {
        uploadFile(
            path.join(__dirname, "../", "public/images/") + request.file.filename
        );
        return response.status(500).json(result);

    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: err, message: 'Cannot SignUp' });
    });
}

exports.SignIn = (request, response) => {

    let b = request.body.email;
    let c = request.body.password;

    adminM.findOne({ email: b, password: c }).then(result => {
        const payload = { subject: result._id };
        const token = jwt.sign(payload, 'ndajkfdskjvdsjfcadsfff');
        return response.status(500).json({
            result: result,
            token: token
        });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: err, message: 'Please Enter Valid Email and Password' });
    });
}

exports.Update = (request, response) => {
    if (request.file) {
        console.log('inside if')
        let a = request.body.name;
        let b = request.body.email;
        let c = request.body.password;
        let d = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=saved-image';
        let e = request.body.mobile;

        adminM.updateOne({ _id: request.body.id }, { $set: { name: a, email: b, password: c, image: d, mobile: e } }).then(result => {
            uploadFile(
                path.join(__dirname, "../", "public/images/") + request.file.filename
            );
            return response.status(500).json(result);

        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: err, message: 'Cannot Update' });
        });
    } else {
        let a = request.body.name;
        let b = request.body.email;
        let c = request.body.password;
        let e = request.body.mobile;

        adminM.updateOne({ _id: request.body.id }, { $set: { name: a, email: b, password: c, mobile: e } }).then(result => {
            return response.status(200).json(result);

        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: err, message: 'Cannot Update' });
        });
    }
}

exports.isApproved = (request, response) => {
    doctor.updateOne({ _id: request.body.dId }, {
        $set: {
            isApproved: true
        }
    }).then(result => {
        console.log(result)
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err)
        return response.status(500).json({ error: err, message: 'Cannot Approved' });
    })
}