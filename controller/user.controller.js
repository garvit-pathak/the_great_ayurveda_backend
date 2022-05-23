const userM = require("../model/user.model");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const requests = require("request");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const { Storage } = require("@google-cloud/storage");
let bucketName = "gs://app-project-ayurveda2.appspot.com";

const storage = new Storage({
    keyFilename: "serviceFirebaseStorage.json",
});

const uploadFile = async(filename) => {
    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "image",
            },
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
};
exports.SignUp = (request, response) => {
    console.log(request.file);

    let a = request.body.name;
    let b = request.body.email;
    let c = request.body.password;
    let d = request.body.mobile;
    let e =
        "https://firebasestorage.googleapis.com/v0/b/app-project-ayurveda2.appspot.com/o/" + request.file.filename + "?alt=media&token=image";

    let randomNumber = Math.floor(100000 + Math.random() * 900000);

    bcrypt
        .hash(c, 10)
        .then((encpass) => {
            userM
                .create({
                    name: a,
                    email: b,
                    password: encpass,
                    mobile: d,
                    image: e,
                    otp: randomNumber,
                })
                .then((result) => {
                    uploadFile(
                        path.join(__dirname, "../", "public/images/") +
                        request.file.filename
                    );
                    return response
                        .status(200)
                        .json({ result: result, message: "Please Enter Otp" });
                })
                .catch((err) => {
                    console.log(err);
                    return response.status(200).json({ error: "OTP not Entered" });
                });
            client.messages
                .create({
                    body: "Hello " + a + " your otp for The Great Ayurveda is" + " " + randomNumber,
                    from: +16105802420,
                    to: +91 + d
                })
                .then(message => console.log(message.sid)).catch(err => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.Verify = (request, response) => {
    userM
        .updateOne({ _id: request.body.id, otp: request.body.otp }, { $set: { isVerified: true } })
        .then((result) => {
            console.log(result.matchedCount);
            console.log(result.modifiedCount);
            if (result.matchedCount && result.modifiedCount) {
                return response
                    .status(201)
                    .json({ result: result, message: "SignUp Success" });
            } else {
                return response
                    .status(403)
                    .json({ result: result, Error: "Please Enter valid otp" });
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(201).json({ error: err });
        });
};

exports.IsVerified = (request, response) => {
    userM
        .findOne({ _id: request.body.id })
        .then((result) => {
            console.log(result);
            if (result.isVerified) {
                return response.status(201).json(result);
            } else {
                return response.status(500).json({ error: "Not a Verified" });
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(201).json({ error: err });
        });
};

exports.SignIn = (request, response) => {
    var a = request.body.email;
    var b = request.body.password;

    userM
        .findOne({ email: a })
        .then((result) => {
            console.log(result);
            const encpass = result.password;
            console.log(b);
            bcrypt.compare(b, encpass, function(err, res) {
                if (result.isVerified && res) {
                    const payload = { subject: result._id };
                    const token = jwt.sign(payload, "dhdbsjcdsncjdsfjdsjkfskjdsfr");
                    return response.status(200).json({
                        result: result,
                        token: token,
                    });
                } else {
                    return response.status(500).json({ error: "Invalid User" });
                }
            });
        })
        .catch((err) => {
            console.log(err);
            return response.status(404).json({ error: err, message: "Invalid user" });
        });
};

exports.Remove = (request, response) => {
    console.log(request.body);
    userM
        .deleteOne({ _id: request.body.id })
        .then((result) => {
            console.log(result)
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ message: "Account Not Removed" });
        });
};

exports.View = (request, response) => {

    userM
        .find()
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ message: "Not getting data" });
        });

};
exports.socialLogin = async(request, response) => {
    const user = await userM.findOne({ email: request.body.email });
    if (user) {
        const payload = { subject: user._id };
        const token = jwt.sign(payload, "dhdbsjcdsncjdsfjdsjkfskjdsfr");
        console.log(user);
        return response.status(200).json({
            user: user,
            token: token,
        });
    } else {
        userM.create({ name: request.body.name, email: request.body.email, image: request.body.image })
            .then(result => {
                const payload = { subject: user._id };
                const token = jwt.sign(payload, "dhdbsjcdsncjdsfjdsjkfskjdsfr");
                console.log(result);
                return response.status(200).json({ user: result, token: token });
            }).catch(err => {
                console.log(err);
                return response.status(500).json(err);
            });
    }
}
exports.updateUser = (request, response) => {
    let image;
    if (request.file) {
        image =
            "https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/" +
            request.file.filename +
            "?alt=media&token=image";

        uploadFile(
            path.join(__dirname, "../", "public/images/") + request.file.filename
        );
        requests({
            url: request.body.oldImage,
            qs: {
                key: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtcKpBScZjc/C0\n55KkzANwzFulQNu+6946RHiZ9/nj1WeYlaqytpOoGoSvkwmhwxaEAdEGo3PbRTNd\nl9ri3HtaeKJQDifdYRUBhJzubtQP1furB+qOP89YAecZ+Gq+ZrNp2m9K5MO12MP+\n3wlN4HDXGhZTuaOcIWUP17HDl7ntadIPPd+sFJwNNJRSvvh2/AfpJnECi2o6ZAsk\nrMlv8WD4E7EHce2ecNgxCOPylraRWTX9ziPAPM5mRDlhoXvmrsGub98DqsEL0OeZ\nXpNAhbDoJ5nUMF3G5tOYmL0Cs+00cIBybQRgULzEGtI/sdlB2NRoaWNq4tcrxRPy\nCdjVruzHAgMBAAECggEAIt+gBC+q2c1yrVVQyZ0R5gjZNpGjfbCchvfEjiTr1JFQ\n2r/hSjzm1Kq8WjdE/QcmjFV3K5ALGCBCc0O46duuW+Mcs98cyeke2abKDTEwp5x9\nlYaqdX7EGKyNRM4L3Iv28EZREWyNI4/Z3PIIw2VpGv8uVRhjGt4mHXjfz/W+l0tV\n1wVb/lPB2oaDICl5QMKxD89MzLrkjh1FtcymWLX6fN9Amhg3beiDuRKTCjuPvsVZ\n+kPvHm6I2moyFtuSbHypRYk9wFiOwODCzcAkh4HUipYriDwF2QlV8YgTXJ8C11Lb\npkOBlzH5Vjlla6NVa4NGWorRG5oZZPdZau8f4R/9RQKBgQDvk2BaSNhGZh1aWt1I\n3Nymmqbx9xyFx3uhVjzIWsTyfa97kxZAQGi6Ca97gBBKlYPwjvlzz2I1cEHOa4xv\n7ghhxV9qKkxEU81JvKmC2CS0e/9cM6dVRaXaMX9Avpp9p+aAvnoIwRlhA4ekLHLC\n6p76575PSWMCibAFWL7aXKOaQwKBgQC5VJbztdMuoMKW7GD7veiFhMUrVTkc3WkL\nEahoaH/lYl/74qsfqfkglJTwpPwheXnGUceEmggKo604a7W7b29aKncX/HBKRxgW\n2Ak+7EMbNM4vL1etXJnh7X7bnDQZoFdQbf+/0lFe4Et2Ut/zrRb7DAZiA/dYjSAc\n/5rN0piFLQKBgBTb1gXGVd47Qc7+HkobwLJYwLRMeZVEOwVfBsfC72bVfpPZyJQr\nh3K7KSYtjj2QKv6k1B87LSfN8EzSnFWaeexZTOdna2B/k14aKQAVZYy5RxB2Btmr\nyLbonFW8wqKyHaWT7/gXJ+iEcCjhHdTOrKzXxIAOuaoc5tBwW52Td0MVAoGAOFzE\nZ6vFZOnZJAMRX54ax/hf6lTJwMCJQKeHGvGk68LmQ/lkZ4XO0Ry+ywyx7RA/e5PF\nZMtfZLTwajc/lphGOhquC2pnT/+dEN10umEp6208w1bXiE6gMfiDWxB/O8fqpfg+\nDj1NJ9h4uqxrlXTvhzvZ+RcRsymAObF2h9/jKKUCgYB1pwW/O+BaDPdai7eZjr/I\nFq5kc9r9O1ljGicIurCG1oBiETZedufPz2PhQwyfT1A2Fq9OqthEpvJitsC7aVO+\nUXBo22m8Gd3Q7C4PVHTgi2PBFyUJ74g9/qG86Gx10311XkWWkLV6ZjHyX1dJURHn\nOxo5Tux8+kYtfaCPopmQcg",
            }, // you can find your private-key in your keyfile.json
            method: "DELETE",
        });
    } else {
        image = request.body.oldImage;
    }
    userM
        .updateOne({ _id: request.body.id }, {
            $set: {
                name: request.body.name,
                email: request.body.email,
                image: image
            },
        })
        .then((result) => {
            console.log(result);
            if (result.modifiedCount)
                return response.status(200).json({ message: "update" });
            else
                return response.status(201).json({ message: "not update" });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json(err);
        });
};