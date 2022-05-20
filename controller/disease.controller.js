const diseaseM = require("../model/disease.model");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const { response } = require("express");
const requests = require("request");
const csv = require('csvtojson');

let storedObj;

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

exports.Add = (request, response) => {
    let image =
        "https://firebasestorage.googleapis.com/v0/b/app-project-ayurveda2.appspot.com/o/" + request.file.filename + "?alt=media&token=image";
    diseaseM
        .create({
            name: request.body.name,
            causes: request.body.causes,
            homeRemedies: request.body.homeRemedies,
            yogaLink: request.body.yogaLink,
            precaution: request.body.precaution,
            image: image,
            keyword: request.body.keyword,
            category: request.body.category,
        })
        .then((result) => {
            uploadFile(
                path.join(__dirname, "../", "public/images/") + request.file.filename
            );
            return response.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Addition not possible" });
        });
};

exports.Review = async(request, response) => {
    let uId = request.body.uId;
    let dId = request.body.dId;
    let reviewText = request.body.reviewText;

    let review = await diseaseM.findOne({ _id: dId });
    console.log(review);
    let Reviewobj = {
        uId: uId,
        reviewText: reviewText,
    };
    review.reviewerDetail.push(Reviewobj);
    review
        .save()
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Something went wrong" });
        });
};
exports.Delete = (request, response) => {
    diseaseM
        .deleteOne({ _id: request.body.id })
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "deletion not done" });
        });
};

exports.ViewAll = (request, response) => {
    diseaseM
        .find()
        .populate({ path: "reviewerDetail.uId" })
        .populate({ path: "medicines.mId" })

    .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Something went wrong" });
        });
};

exports.MedicineAdd = async(request, response) => {
    let mId = request.body.mId;
    let dId = request.body.dId;
    let medicineAdd = await diseaseM.findOne({ _id: dId });
    var obj = { mId: mId };
    medicineAdd.medicines.push(obj);

    medicineAdd
        .save()
        .then((result) => {
            return response.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Medicine not added" });
        });
};
exports.MedicineRemove = (request, response) => {};

exports.Update = (request, response) => {
    let image;
    if (request.file) {
        image =

            "https://firebasestorage.googleapis.com/v0/b/app-project-ayurveda2.appspot.com/o/" + request.file.filename + "?alt=media&token=image";


        uploadFile(
            path.join(__dirname, "../", "public/images/") + request.file.filename
        );
        requests({
            url: request.body.oldImage,
            qs: {
                key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCtcKpBScZjc/C0\n55KkzANwzFulQNu+6946RHiZ9/nj1WeYlaqytpOoGoSvkwmhwxaEAdEGo3PbRTNd\nl9ri3HtaeKJQDifdYRUBhJzubtQP1furB+qOP89YAecZ+Gq+ZrNp2m9K5MO12MP+\n3wlN4HDXGhZTuaOcIWUP17HDl7ntadIPPd+sFJwNNJRSvvh2/AfpJnECi2o6ZAsk\nrMlv8WD4E7EHce2ecNgxCOPylraRWTX9ziPAPM5mRDlhoXvmrsGub98DqsEL0OeZ\nXpNAhbDoJ5nUMF3G5tOYmL0Cs+00cIBybQRgULzEGtI/sdlB2NRoaWNq4tcrxRPy\nCdjVruzHAgMBAAECggEAIt+gBC+q2c1yrVVQyZ0R5gjZNpGjfbCchvfEjiTr1JFQ\n2r/hSjzm1Kq8WjdE/QcmjFV3K5ALGCBCc0O46duuW+Mcs98cyeke2abKDTEwp5x9\nlYaqdX7EGKyNRM4L3Iv28EZREWyNI4/Z3PIIw2VpGv8uVRhjGt4mHXjfz/W+l0tV\n1wVb/lPB2oaDICl5QMKxD89MzLrkjh1FtcymWLX6fN9Amhg3beiDuRKTCjuPvsVZ\n+kPvHm6I2moyFtuSbHypRYk9wFiOwODCzcAkh4HUipYriDwF2QlV8YgTXJ8C11Lb\npkOBlzH5Vjlla6NVa4NGWorRG5oZZPdZau8f4R/9RQKBgQDvk2BaSNhGZh1aWt1I\n3Nymmqbx9xyFx3uhVjzIWsTyfa97kxZAQGi6Ca97gBBKlYPwjvlzz2I1cEHOa4xv\n7ghhxV9qKkxEU81JvKmC2CS0e/9cM6dVRaXaMX9Avpp9p+aAvnoIwRlhA4ekLHLC\n6p76575PSWMCibAFWL7aXKOaQwKBgQC5VJbztdMuoMKW7GD7veiFhMUrVTkc3WkL\nEahoaH/lYl/74qsfqfkglJTwpPwheXnGUceEmggKo604a7W7b29aKncX/HBKRxgW\n2Ak+7EMbNM4vL1etXJnh7X7bnDQZoFdQbf+/0lFe4Et2Ut/zrRb7DAZiA/dYjSAc\n/5rN0piFLQKBgBTb1gXGVd47Qc7+HkobwLJYwLRMeZVEOwVfBsfC72bVfpPZyJQr\nh3K7KSYtjj2QKv6k1B87LSfN8EzSnFWaeexZTOdna2B/k14aKQAVZYy5RxB2Btmr\nyLbonFW8wqKyHaWT7/gXJ+iEcCjhHdTOrKzXxIAOuaoc5tBwW52Td0MVAoGAOFzE\nZ6vFZOnZJAMRX54ax/hf6lTJwMCJQKeHGvGk68LmQ/lkZ4XO0Ry+ywyx7RA/e5PF\nZMtfZLTwajc/lphGOhquC2pnT/+dEN10umEp6208w1bXiE6gMfiDWxB/O8fqpfg+\nDj1NJ9h4uqxrlXTvhzvZ+RcRsymAObF2h9/jKKUCgYB1pwW/O+BaDPdai7eZjr/I\nFq5kc9r9O1ljGicIurCG1oBiETZedufPz2PhQwyfT1A2Fq9OqthEpvJitsC7aVO+\nUXBo22m8Gd3Q7C4PVHTgi2PBFyUJ74g9/qG86Gx10311XkWWkLV6ZjHyX1dJURHn\nOxo5Tux8+kYtfaCPopmQcg==\n-----END PRIVATE KEY-----\n",
            }, // you can find your private-key in your keyfile.json
            method: "DELETE",
        });
    } else {
        image = request.body.oldImage;
    }
    diseaseM
        .updateOne({ _id: request.body.id }, {
            $set: {
                name: request.body.name,
                causes: request.body.causes,
                homeRemedies: request.body.homeRemedies,
                yogaLink: request.body.yogaLink,
                precaution: request.body.precaution,
                image: image,
                keyword: request.body.keyword,
                category: request.body.category,
            },
        })
        .then((result) => {
            console.log(result);
            if (result.modifiedCount)
                return response.status(200).json({ message: "update" });
            else return response.status(201).json({ message: "not update" });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json(err);
        });
};

exports.ViewParticularDisease = (request, response) => {
    let dId = request.body.dId;
    diseaseM
        .findOne({ _id: dId })
        .populate({ path: "reviewerDetail.uId" })
        .populate({ path: "medicines.mId" })
        .then((result) => {
            return response.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "something went wrong" });
        });
};

exports.deleteOneMedicine = (request, response) => {
    var obj = {
        mId: request.body.mId,
    };
    diseaseM
        .updateOne({ _id: request.body.dId }, { $pull: { medicines: { _id: request.body.id } } }, { safe: true, multi: false })
        .then((result) => {
            console.log(result);
            if (result.modifiedCount)
                return response.status(200).json({ message: "update  success..." });
            else return response.status(201).json({ message: "not updated...." });
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ message: "something went wrong" });
        });
};

exports.Search = (request, response) => {
    diseaseM
        .find({ keyword: { $regex: request.body.keyword, $options: "i" } })
        .then((result) => {
            console.log(result);
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json(err);
        });
};


exports.ExcelUpload = (request, response) => {
    const filePath = 'diseaseExcel.csv';
    let storedObj;
    csv().fromFile(filePath).then(jsonObj => {
        storedObj = jsonObj;
        console.log(jsonObj);
        for (let obj of jsonObj) {
            //console.log(obj);
            let medicines = obj.mId;
            let disease = new diseaseM();
            disease.name = obj.name;
            disease.causes = obj.causes;
            disease.homeRemedies = obj.homeRemedies;
            disease.precaution = obj.precaution;
            disease.yogaLink = obj.yogaLink;
            disease.image = obj.image;
            disease.keyword = obj.keyword;
            disease.category = obj.category
            let medicineList = medicines.split(",");
            console.log(disease.name);
            for (let medicine of medicineList)
                disease.medicines.push({ mId: medicine });
            disease.save().then(() => {
                console.log('Data uploaded..........');
            }).catch(err => {
                console.log(err);
                console.log('Data Error.....');
            });
        }
    }).catch(err => {
        console.log(err);

    })
};