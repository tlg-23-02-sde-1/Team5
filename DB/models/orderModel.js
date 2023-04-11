const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
    quantity: {
      type: Number,
    },
    shippingInformation: {
      type: String,
    },
    paymentDetails: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
