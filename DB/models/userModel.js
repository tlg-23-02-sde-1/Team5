const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    cart: [
      {
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plant",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
