const orderM = require("../model/order.model");
const Razorpay = require("razorpay");

const rzp = new Razorpay({
    key_id: "rzp_test_NoD4Su2E0uGypJ",
    key_secret: "wKd9yXeS1gfh5sDe87kLWBP2",
});


exports.place = (request, response) => {
    console.log(request.body);
    let medicineList = request.body.medicineList;
    orderM.create({
        userId: request.body.id,
        medicineList: request.body.medicineList,
        mobile: request.body.mobile,
        address: request.body.address,
        amount: request.body.amount,
        orderStatus: 'ordered'
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
}

exports.create = (request, response) => {
    console.log(request.body)
    console.log(request.body.order.medicineList);
    orderM.create({
        userId: request.body.order.id,
        medicineList: request.body.order.medicineList,
        mobile: request.body.order.mobile,
        address: request.body.order.address,
        amount: request.body.order.amount * 1,
        orderStatus: 'ordered'

    }).then(result => {
        return response.status(200).json({ result });
    }).catch(err => {
        console.log(err);
    });
}


exports.payOnline = (request, response) => {
    rzp.orders.create({
        amount: request.body.payment + '00',
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }, (err, order) => {
        console.log(order)
        response.json(order)
        console.log(err)
    })


}

exports.ViewPlacedOrder = (request, response) => {
    orderM
        .findOne({ orderStatus: "ordered" })
        .populate("userId")
        .populate({ path: "medicineList.medicines" })
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: error });
        });
};

exports.DeliveryStatusUpdate = (request, response) => {
    console.log(request.body);
    orderM
        .updateOne({ _id: request.body.oId }, { delivery: "delivered" })
        .then((result) => {
            if (result.modifiedCount && result.matchedCount) {
                return response
                    .status(200)
                    .json({ result: result, status: "Order Delivered" });
            } else {
                return response
                    .status(403)
                    .json({ error: "Not Updated or already updated" });
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Cannot update your changes" });
        });
};

exports.DeliveredOrders = (request, response) => {
    orderM
        .find({ delivery: "delivered" })
        .populate("userId")
        .populate({ path: "medicineList.medicines" })
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Cannot fetch data" });
        });
};

exports.TrackOrder = (request, response) => {
    orderM
        .findOne({ orderStatus: "ordered", userId: request.body.userId })
        .populate("userId")
        .populate({ path: "medicineList.medicines" })
        .then((result) => {
            return response.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Cannot getting details" });
        });
};

exports.CancelOrder = (request, response) => {
    orderM
        .findOne({ orderStatus: "ordered", userId: request.body.userId })
        .then((result) => {
            if (result.delivery == "pending") {
                console.log("inside if");
                orderM
                    .deleteOne({ userId: request.body.userId })
                    .then((result) => {
                        return response.status(200).json({ message: "Order Deleted" });
                    })
                    .catch((err) => {
                        console.log(err);
                        return response.status(404).json({ error: "cannot canceled" });
                    });
            } else {
                return response.status(403).json({ error: "Cannot cancel order" });
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: "Internal error" });
        });
};