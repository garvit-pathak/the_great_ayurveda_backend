const userM = require('../model/user.model');
const bcrypt = require("bcryptjs");
const fastTwoSms = require('fast-two-sms');
const path = require('path');
const jwt = require('jsonwebtoken');

const { Storage } = require('@google-cloud/storage');
let bucketName = "gs://ayurveda-d6cac.appspot.com"

const storage = new Storage({
    keyFilename: "serviceFirebaseStorage.json"
});

const uploadFile = async (filename) => {

    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "user-image"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}
exports.SignUp = (request, response) => {

    let a = request.body.name;
    let b = request.body.email;
    let c = request.body.password;
    let d = request.body.mobile;
    let e = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=user-image';

    let randomNumber = Math.floor(100000 + Math.random() * 900000);


    bcrypt.hash(c, 10)
        .then(encpass => {
            userM.create({ name: a, email: b, password: encpass, mobile: d, image: e, otp: randomNumber }).then(result => {
                uploadFile(
                    path.join(__dirname, "../", "public/images/") + request.file.filename
                );
                return response.status(200).json({ result: result, message: 'Please Enter Otp' });
            }).catch(err => {
                console.log(err);
                return response.status(200).json({ error: 'OTP not Entered' });
            })
            var options = {
                authorization: "FtQi9Z8SXlC5rq1VdNjsKREuO7wWTmnc6zvbI0eJHYLfohMAUxL5mucn6aw1PpNosir4G8gyJzRFEeYj",
                message: 'Your One Time OTP for signup in The Great Ayurveda is ' + randomNumber,
                numbers: [d]
            }
            fastTwoSms.sendMessage(options).then(result => {
                console.log(result);

            }).catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });


}

exports.Verify = (request, response) => {
    userM.updateOne({ _id: request.body.id, otp: request.body.otp }, { $set: { isVerified: true } }).then(result => {
        console.log(result.matchedCount);
        console.log(result.modifiedCount);
        if (result.matchedCount && result.modifiedCount) {
            return response.status(201).json({ result: result, message: 'SignUp Success' });

        }
        else {
            return response.status(403).json({ result: result, Error: 'Please Enter valid otp' });

        }
    }).catch(err => {
        console.log(err);
        return response.status(201).json({ error: err });
    })

}

exports.IsVerified = (request, response) => {
    userM.findOne({ _id: request.body.id }).then(result => {
        console.log(result);
        if (result.isVerified) {
            return response.status(201).json(result);
        }
        else {
            return response.status(500).json({ error: 'Not a Verified' });
        }


    }).catch(err => {
        console.log(err);
        return response.status(201).json({ error: err });
    })

}

exports.SignIn = (request, response) => {
    var a = request.body.email;
    var b = request.body.password;

    userM.findOne({ email: a }).then(result => {
        console.log(result);
        const encpass = result.password;
        console.log(b);
        bcrypt.compare(b, encpass, function (err, res) {
            if (result.isVerified && res) {
                const payload = { subject: result._id };
                const token = jwt.sign(payload, 'dhdbsjcdsncjdsfjdsjkfskjdsfr');
                return response.status(201).json(
                    {
                        result: result,
                        token: token
                    }
                );
            }
            else {
                return response.status(500).json({ error: 'Invalid User' });
            }
        });

    }).catch(err => {
        console.log(err);
        return response.status(404).json({ error: err, message: 'Invalid user' });
    })

}

exports.Remove = (request, response) => {
    userM.deleteOne({ _id: request.body.id }).then(result => {
        return response.status(200).json({ message: 'Account Removed' });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ message: 'Account Not Removed' });

    })
}

exports.View = (request, response) => {
    userM.find().then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ message: 'Not getting data' });

    })
}