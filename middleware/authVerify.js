const jwt =require('jsonwebtoken');

exports.verifyToken=(request,response,next)=>{
    try{
        if(!request.headers.authorization)
        return response.status(401).json({message:'Unauthorized Request'});

        if(request.headers.authorization==null)
        return response.status(401).json({message:'Unauthorized Request'});

        let token = request.headers.authorization.spil(' ')[1];
        console.log(token);

        let payload=jwt.verify(token,'xjandsjncndsjnfds');
        next();
    }
    catch(err){
        console.log(err);
        return response.status(401).json({message:'Unauthorized Request'});
    }
}