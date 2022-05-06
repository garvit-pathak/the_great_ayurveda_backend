const cartM = require('../model/cart.model')

exports.Add = async (request, response) => {
    let uId = request.body.uId;
    let mId = request.body.mId;
    let cart = await cartM.findOne({ userId: uId });
    console.log(request.body);
    if (!cart) {
        cart = new cartM();
        cart.userId = uId;
    }
    console.log(cart);

    cart.medicineList.push(mId);
    cart.save().then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Not added' });
    })
}

exports.View = (request, response) => {
    cartM.findOne({ userId: request.body.uId }).populate('medicineList').then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Not getting' });
    })
}

exports.Delete = (request, response) => {
    cartM.deleteOne({ _id: request.body.id }).then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        console.log(err);
        return response.status(500).json({error:'Not Deleted'});

    });
}

exports.RemoveItems = (request, response) => {
    cartM.updateOne({ userId: request.body.uId},{$pullAll:{medicineList:[{_id:request.body.pId}]}}).then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        console.log(err);
        return response.status(500).json({error:'Not Deleted'});

    });
}