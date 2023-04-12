const express = require("express");
const {
  getPage,
  postPlants,
  getAllPlants,
  updatePlant,
  deletePlant,
  getOnePlant,
  getCart,
  removeItemFromCart,
  addItemToCart,
  verifyUserInDb,
  incrementItemOnCart,
  decrementItemOnCart,
} = require("../Controller/controller");

// using Router instead of express()
const Router = express.Router();

Router.route("/").get(verifyUserInDb, getPage).post(postPlants);

Router.route("/cart").get(getCart);

Router.route("/cart/:id").delete(removeItemFromCart).post(addItemToCart);

Router.route("/cart/:id/increment").put(incrementItemOnCart);

Router.route("/cart/:id/decrement").patch(decrementItemOnCart);

Router.route("/plants").get(getAllPlants);

Router.route("/:id").put(updatePlant).delete(deletePlant).get(getOnePlant);

module.exports = { Router };
