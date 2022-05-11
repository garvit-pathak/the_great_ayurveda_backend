const orderM = require('../model/order.model');

exports.PlaceOrder = (request, response) => {
    let userId = request.body.userId;
    let medicines = request.body.medicines;
    let price = request.body.price;
    let total = request.body.total;
    let quantity = request.body.quantity;
    let mobile = request.body.mobile;
    let address = request.body.address;
    let paymentId = request.body.paymentId;
    let dateObj = new Date();
    let dd = dateObj.getDate();
    let mm = dateObj.getMonth() + 1;
    let yy = dateObj.getFullYear();

    let currentDate = dd + '/' + mm + '/' + yy;
    console.log(currentDate);
    orderM.create({ userId: userId, date: currentDate, medicineList: { medicines: medicines, price: price, total: total, quantity: quantity }, mobile: mobile, address: address, paymentId: paymentId, orderStatus: 'ordered' }).then(result => {
        return response.status(200).json({ result: result, });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: error });
    });
}

exports.ViewPlacedOrder = (request, response) => {

    orderM.findOne({ orderStatus: 'ordered' }).populate('userId').populate({ path: 'medicineList.medicines' }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: error });
    });
}

exports.DeliveryStatusUpdate = (request, response) => {

    orderM.updateOne({ _id: request.body.oId }, { delivery: 'delivered' }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot update your changes' });
    });
}

exports.DeliveredOrders = (request, response) => {

    orderM.find({ delivery: 'delivered' }).populate('userId').populate({ path: 'medicineList.medicines' }).then(result => {
        return response.status(200).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot fetch data' });
    });
}

exports.TrackOrder = (request, response) => {
    orderM.findOne({ orderStatus: 'ordered', userId: request.body.userId }).populate('userId').populate({ path: 'medicineList.medicines' }).
        then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: 'Cannot getting details' });
        });
}

exports.CancelOrder = (request, response) => {
    orderM.findOne({ orderStatus: 'ordered', userId: request.body.userId }).then(result => {
        if (result.delivery == 'pending') {
            console.log('inside if');
            orderM.deleteOne({userId:request.body.userId}).then(result=>{
                return response.status(200).json({ message: 'Order Deleted' });
            }).catch(err=>{
                console.log(err);
                return response.status(404).json({error:'cannot canceled'});
            });
            
        }
        else {
            return response.status(403).json({ error: 'Cannot cancel order' });
        }

    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Internal error' });
    });
}