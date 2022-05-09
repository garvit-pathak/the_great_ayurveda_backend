
const diseaseM=require('../model/disease.model');
const path = require('path');
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
                firebaseStorageDownloadTokens: "image"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.Add=(request,response)=>{
    let name= request.body.name;
    let causes= request.body.causes;
    let homeRemedies = request.body.homeRemedies ;
    let yogaLink= request.body.yogaLink;
    let yogaThumbnail= request.body.yogaThumbnail;
    let image= 'https://firebasestorage.googleapis.com/v0/b/ayurveda-d6cac.appspot.com/o/' + request.file.filename + '?alt=media&token=saved-image';
    let keyword= request.body.keyword ;
    let category= request.body.category;
     
    diseaseM.create({ name: name, causes: causes, homeRemedies: homeRemedies, yogaLink: yogaLink, yogaThumbnail: yogaThumbnail, image: image, keyword: keyword ,category:category})
    .then(result => {
        uploadFile(
            path.join(__dirname, "../", "public/images/") + request.file.filename
        );
        return response.status(201).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Addition not possible' });
    });
}
exports.Review = async (request, response) => {
    console.log(request.body);
    let uId = request.body.uId;
    let pId = request.body.pId;
    let reviewText = request.body.reviewText;

    let review = await diseaseM.findOne({ _id: pId });
    let he = {
        _id: uId,
        reviewText: reviewText
    }
    review.reviewerDetail.push(he);
    review.save().then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Something went wrong' });
    });
}
 exports.Delete=(request,response)=>{
   diseaseM.deleteOne({_id:request.body.id}).then(result=>{
       return response.status(200).json(result);
   }).catch(err=>{
       console.log(err);
       return response.status(500).json({error:'deletion not done'})
   })
 }
 exports.ViewAll = (request, response) => {
    diseaseM.find().then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Something went wrong' });
    });
}

 