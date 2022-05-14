const medicineM = require('../model/medicine.model');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
// const csv=require('csvtojson');

let bucketName = "gs://ayurveda-d6cac.appspot.com"

const storage = new Storage({
    keyFilename: "serviceFirebaseStorage.json"
});

const uploadFile = async(filename) => {

    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata: {
                firebaseStorageDownloadTokens: "medicine-image"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.Add = (request, response) => {

    let a = request.body.name;
    let b = request.body.price;
    let c = request.body.description;
    let d = request.body.stock;
    let e = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=medicine-image';
    let f = request.body.keyword;
    let g = request.body.category;
    let precaution = request.body.precaution;
    let ingredients = request.body.ingredients;
    let uses = request.body.uses;
    let SideEffect = request.body.sideEffect;
    medicineM.create({
        name: a,
        price: b,
        description: c,
        stock: d,
        image: e,
        keyword: f,
        category: g,
        precaution: precaution,
        ingredients: ingredients,
        uses: uses,
        sideEffect:SideEffect
    }).then(result => {
        uploadFile(
            path.join(__dirname, "../", "public/images/") + request.file.filename
        );
        return response.status(201).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Added' });
    });
}

exports.Review = async(request, response) => {
    console.log(request.body);
    let uId = request.body.uId;
    let pId = request.body.pId;
    let reviewText = request.body.reviewText;

    let review = await medicineM.findOne({ _id: pId });
    let he = {
        _id: uId,
        reviewText: reviewText
    }
    review.reviewerDetail.push(he);
    review.save().then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Review' });
    });
}

exports.ViewAll = (request, response) => {
    medicineM.find().then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Getting' });
    });
}

exports.ViewByProduct = (request, response) => {
    medicineM.findOne({ _id: request.body.id }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Getting' });
    });
}

exports.ViewByCat = (request, response) => {
    medicineM.findOne({ category: request.body.catId }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Getting' });
    });
}

exports.Delete = (request, response) => {
    medicineM.deleteOne({ _id: request.body.id }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot Getting' });
    });
}

exports.Update = (request, response) => {
    if (request.file) {
        let a = request.body.name;
        let b = request.body.price;
        let c = request.body.description;
        let d = request.body.stock;
        let e = 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=medicine-image';
        let f = request.body.keyword;
        let g = request.body.category;
        let precaution = request.body.precaution;
        let ingredients = request.body.ingredients;
        let uses = request.body.uses;
        medicineM.updateOne({ _id: request.body.pId }, {
            $set: {
                name: a,
                price: b,
                description: c,
                stock: d,
                image: e,
                keyword: f,
                catgory: g,
                precaution: precaution,
                ingredients: ingredients,
                uses: uses
            }
        }).then(result => {
            uploadFile(
                path.join(__dirname, "../", "public/images/") + request.file.filename
            );
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Cannot Update' });
        });
    } else {
        let a = request.body.name;
        let b = request.body.price;
        let c = request.body.description;
        let d = request.body.stock;
        let f = request.body.keyword;
        let g = request.body.category;
        let precaution = request.body.precaution;
        let ingredients = request.body.ingredients;
        let uses = request.body.uses;
        medicineM.updateOne({ _id: request.body.pId }, {
            $set: {
                name: a,
                price: b,
                description: c,
                stock: d,
                keyword: f,
                catgory: g,
                precaution: precaution,
                ingredients: ingredients,
                uses: uses
            }
        }).then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Cannot Update' });
        });
    }
}

exports.viewByKeyword = (request, response) => {
    medicineM.find({ keyword: { $regex: request.body.keyword, $options: "i" } })
        .then(result => {
            console.log(result);
            return response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ message: "Not found" });
        });
}

exports.ExcelSave=(request,res)=>{
    const csvFilePath = 'hello.csv';
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {

            stored = jsonObj;
            //console.log(stored);
            medicineM.create(stored).then(result => {
                console.log(result);
                return res.status(201).json(result);
            }).catch(err => {
                console.log(err);
                return res.status(500).json({ error: 'Not save' });
            });
        });
}