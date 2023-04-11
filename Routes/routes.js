const express = require("express");
const {
  getPage,
  postPlants,
  getAllPlants,
  updatePlant,
  deletePlant,
  getOnePlant,
} = require("../Controller/controller");

// using Router instead of express()
const Router = express.Router();

Router.route("/").get(getPage).post(postPlants);

Router.route("/plants").get(getAllPlants);

Router.route("/:id").put(updatePlant).delete(deletePlant).get(getOnePlant);

module.exports = { Router };
