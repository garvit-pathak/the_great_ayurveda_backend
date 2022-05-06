const queryM=require('../model/query.model');

exports.SendQuery=(request,response)=>{
    let a=request.body.email;
    let b=request.body.query;
    let d=request.body.mobile;
    queryM.create({email:a,query:b,mobile:d}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not getting data'});

    })
}

exports.Resolve=(request,response)=>{
    queryM.updateOne({_id:request.body.id},{$set:{status:'Resolved'}}).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not Resolved'});

    })
}

exports.Check=(request,response)=>{
    queryM.findOne({_id:request.body.id}).then(result=>{
        console.log(result);
        console.log(result.status);
        if(result.status=='Resolved'){
            console.log('inside if');
            return response.status(200).json(result);
        }
        else{
            return response.status(404).json({message:'Query not resolved'});
        }
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error:'Not Resolved'}); 
    })
}