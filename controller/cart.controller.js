const cartM = require("../model/cart.model");

exports.Add = async (request, response) => {
  var cart = await cartM.findOne({ userId: request.body.uId });

  if (!cart) cart = new cartM({ userId: request.body.uId });

  cart.medicineList.push(request.body.mId);
  cart
    .save()
    .then((results) => {
      console.log(results);
      return response.status(201).json(results);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" });
    });
};

exports.View = (request, response) => {
  cartM
    .findOne({ userId: request.body.uId })
    .populate("medicineList")
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: "Not getting" });
    });
};

exports.Delete = (request, response) => {
  cartM
    .deleteOne({ _id: request.body.id })
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: "Not Deleted" });
    });
};

exports.RemoveItems = (request, response) => {
  cartM
    .updateOne(
      { userId: request.body.uId },
      { $pullAll: { medicineList: [{ _id: request.body.pId }] } }
    )
    .then((result) => {
      return response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return response.status(500).json({ error: "Not Deleted" });
    });
};
