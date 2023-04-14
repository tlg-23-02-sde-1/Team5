const express = require("express");
const { requiresAuth } = require("express-openid-connect");
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
  checkout,
  successOrder,
} = require("../Controller/controller");

// using Router instead of express()
const Router = express.Router();

Router.route("/").get(requiresAuth(), verifyUserInDb, getPage).post(postPlants);

Router.route("/cart").get(getCart);

Router.route("/cart/:id").delete(removeItemFromCart).post(addItemToCart);

Router.route("/cart/:id/increment").patch(incrementItemOnCart);

Router.route("/cart/:id/decrement").patch(decrementItemOnCart);

Router.route("/plants").get(getAllPlants);

Router.route("/plants/:id").put(updatePlant).delete(deletePlant).get(getOnePlant);

Router.route('/create-checkout-session').post(verifyUserInDb , checkout)

Router.route('/order/success').get(verifyUserInDb, successOrder)

module.exports = { Router };
