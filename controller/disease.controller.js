
// const diseaseM=require('../model/disease.model');
// const path = require('path');
// const { Storage } = require('@google-cloud/storage');
// let bucketName = "gs://ayurveda-d6cac.appspot.com"

// const storage = new Storage({
//     keyFilename: "serviceFirebaseStorage.json"
// });

// const uploadFile = async (filename) => {

//     await storage.bucket(bucketName).upload(filename, {
//         gzip: true,
//         metadata: {
//             metadata: {
//                 firebaseStorageDownloadTokens: "disease-image"
//             }
//         },
//     });

//     console.log(`${filename} uploaded to ${bucketName}.`);
// }

// exports.Add=(request,response)=>{
//     let a= request.body.name;
//     let b= request.body.causes;
//     let c= request.body.homeRemedies ;
//     let d= request.body.yogaLink;
//     let e = request.body.yogaThumbnail;
//     let f= request.file.filename;
//     let g= request.body.keyword ;
    
   
    
//     diseaseM.create({ name: a, causes: b, homeRemedies: c, yogaLink: d, yogaThumbnail: e, image: f, keyword: g })
//     .then(result => {
//         uploadFile(
//             path.join(__dirname, "../", "public/images/") + request.file.filename
//         );
//         return response.status(201).json(result);
//     }).catch(err => {
//         console.log(err);
//         return response.status(500).json({ error: 'Cannot Added' });
//     });
// }