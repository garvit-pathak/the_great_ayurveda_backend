const orderM = require("../model/order.model");
const cartM = require("../model/cart.model");
const Razorpay = require("razorpay");

const rzp = new Razorpay({
  key_id: "rzp_test_NoD4Su2E0uGypJ",
  key_secret: "wKd9yXeS1gfh5sDe87kLWBP2",
});

exports.PlaceOrder = (request, response) => {
  let userId = request.body.userId;
  let medicines = request.body.medicines;
  let price = request.body.price;
  let quantity = request.body.quantity;
  let mobile = request.body.mobile;
  let address = request.body.address;
  let paymentId = request.body.paymentId;
  let dateObj = new Date();
  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1;
  let yy = dateObj.getFullYear();

  let currentDate = dd + "/" + mm + "/" + yy;
  let total = request.body.total;

  console.log(currentDate);
  orderM
    .create({
      userId: userId,
      date: currentDate,
      medicineList: {
        medicines: medicines,
        price: price,
        total: total,
        quantity: quantity,
      },
      mobile: mobile,
      address: address,
      orderStatus: "ordered",
    })
    .then((result) => {
      cartM
        .deleteOne({ userId: userId })
        .then((resultUpdate) => {
          console.log(resultUpdate);
          if (resultUpdate.deletedCount) {
            return response
              .status(200)
              .json({
                result: result,
                message: "Order Placed and Cart Product released",
              });
          } else {
            return response.status(200).json({ error: "Not Updated" });
          }
        })
        .catch((errUpdate) => {
          console.log(errUpdate);
          return response.status(500).json({ error: "Internal Error" });
        });
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: error });
    });
};

exports.RazorPayOnlinePayment = (request, response) => {
  let userId = request.body.userId;
  let medicines = request.body.medicines;
  let price = request.body.price;
  let quantity = request.body.quantity;
  let mobile = request.body.mobile;
  let address = request.body.address;
  let dateObj = new Date();
  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1;
  let yy = dateObj.getFullYear();
  let total = request.body.total;
  let amount=total*1;
  
  let currentDate = dd + "/" + mm + "/" + yy;
  
  rzp.orders.create({
    amount: amount,
    currency: "INR"
  }, (err, order) => {
    if (err) {
      console.log(err);
    } else {
      orderM.create({
        userId: userId,
        date: currentDate,
        medicineList: {
          medicines: medicines,
          price: price,
          total: total,
          quantity: quantity,
        },
        mobile: mobile,
        address: address,
        orderStatus: "ordered"
      }).then(result => {
        console.log(result);
        return response.status(200).json( {order,result} );
      }).catch(err => {
        console.log(err);
        return response.status(500).json( {error:'Payment Not Successfull'} );

      });
    }
  });
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