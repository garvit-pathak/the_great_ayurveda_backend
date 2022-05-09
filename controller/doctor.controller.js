const doctorM=require('../model/doctor.model');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { response } = require('express');
const { request } = require('http');
let bucketName = "gs://ayurveda-d6cac.appspot.com"

const storage = new Storage({
    keyFilename: "serviceFirebaseStorage.json"
});

const uploadFile = async (filename) => {

    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "image"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.addDoctor =(request,response)=>{
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let mobile = request.body.mobile;
        let image = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=image';
        let isApproved = request.body.isApproved;
        let exprience = request.body.exprience;
        let degree=request.body.degree;
        let category=request.body.category;
        let otp=request.body.otp;
        let isverfied=request.body.isverfied;
        let specialities=request.body.specialities;
        let clinicName=request.body.clinicName;
        let clinicAddress=request.body.clinicAddress;
        let clinicNo=request.body.clinicNo;
        let clinicTiming=request.body.clinicTiming;
        

        doctorM.create({ name: name, email: email, password: password, mobile: mobile, image: image, isApproved: isApproved, 
            exprience: exprience,degree:degree,category:category,otp:otp,isverfied:isverfied,specialities:specialities,clinicName:clinicName
            ,clinicAddress:clinicAddress,clinicNo:clinicNo,clinicTiming:clinicTiming}).then(result => {
            uploadFile(
                path.join(__dirname, "../", "public/images/") + request.file.filename
            );
            return response.status(201).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Cannot Added' });
        });
    }
    exports.review = async (request, response) => {
        console.log(request.body);
        let uId = request.body.uId;
        let dId = request.body.dId;
        let reviewText = request.body.reviewText;
    
        let review = await doctorM.findOne({ _id: dId });
        let reviewdetailsobj = {
            _id: uId,
            reviewText: reviewText
        }
        review.reviewerDetail.push(reviewdetailsobj);
        review.save().then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Cannot Review' });
        });
    }


    exports.viewAllDoctor=(request,response)=>{
        doctorM.find()
        .then(result=>{
            console.log(result);
            return response.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            return response.status(500).json({message:"Not found"});
        })
    }
    exports.viewOneDoctor=(request,response)=>{
        doctorM.findOne({_id:request.body.doctorId}).then(result=>{
            console.log(result);
            return response.status(200).json(result);
        }).catch(err=>{
            console.log(err);
            return response.status(500).json({message:"Not found"});
        })
    }

    exports.viewByName=(request,response)=>{
        doctorM.findOne({name:request.body.name})
        .then(result=>{
            console.log(result);
            return response.status(200).json(result);
        })
        .catch(err=>{
            console.log(err);
            return response.status(500).json({message:"Not found"});
        });
    }

    exports.viewByCat=(request,response)=>{
        doctorM.findOne({category: request.body.catId }).then(result=>{
            console.log(result);
            return response.status(200).json(result);
        }).catch(err=>{
            console.log(err);
            return response.status(500).json({message:"not found"});
        })
    }


    exports.deleteDoctor=(request,response)=>{
        doctorM.deleteOne({_id:request.body.id})
            .then(result=>{
            console.log(result);
            if(deletedCount)
            return response.status(200).json({message:"delete succcess"});
            else
            return response.status(400).json({message:"not deleted"})
        }).catch(err=>{
          console.log(err);
          return response.status(500).json({message:"Error"});
        })
    }

    exports.updateDoctor=(request,response)=>{
        if (request.file) {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let mobile = request.body.mobile;
        let image = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=image';
        let isApproved = request.body.isApproved;
        let exprience = request.body.exprience;
        let degree=request.body.degree;
        let category=request.body.category;
        let otp=request.body.otp;
        let isverfied=request.body.isverfied;
        let specialities=request.body.specialities;
        let clinicName=request.body.clinicName;
        let clinicAddress=request.body.clinicAddress;
        let clinicNo=request.body.clinicNo;
        let clinicTiming=request.body.clinicTiming;
            doctorM.updateOne({ _id: request.body.dId }, { $set: { name: name, email: email, password: password, 
                mobile: mobile, image: image, isApproved: isApproved, exprience: exprience,degree:degree,category:category,
                otp:otp,isverfied:isverfied,specialities:specialities,clinicName:clinicName,clinicAddress:clinicAddress,
                clinicNo:clinicNo,clinicTiming:clinicTiming
            } }).then(result => {
                uploadFile(
                    path.join(__dirname, "../", "public/images/") + request.file.filename
                );
                return response.status(200).json(result);
            }).catch(err => {
                console.log(err);
                return response.status(500).json({ error: 'Cannot Update' });
            });
        }
        else{
            let name = request.body.name;
            let email = request.body.email;
            let password = request.body.password;
            let mobile = request.body.mobile;
            let isApproved = request.body.isApproved;
            let exprience = request.body.exprience;
            let degree=request.body.degree;
            let category=request.body.category;
            let otp=request.body.otp;
            let isverfied=request.body.isverfied;
            let specialities=request.body.specialities;
            let clinicName=request.body.clinicName;
            let clinicAddress=request.body.clinicAddress;
            let clinicNo=request.body.clinicNo;
            let clinicTiming=request.body.clinicTiming;
            doctorM.updateOne({ _id: request.body.dId }, { $set: { name: name, email: email, password: password, 
                mobile: mobile, isApproved: isApproved, exprience: exprience,degree:degree,category:category,
                otp:otp,isverfied:isverfied,specialities:specialities,clinicName:clinicName,clinicAddress:clinicAddress,
                clinicNo:clinicNo,clinicTiming:clinicTiming} }).then(result => {
                return response.status(200).json(result);
            }).catch(err => {
                console.log(err);
                return response.status(500).json({ error: 'Cannot Update' });
            });
        }
    }