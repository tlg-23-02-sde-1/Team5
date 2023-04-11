const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { connect } = require("./DB/config");
const { Router } = require("./Routes/routes");
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};

connect();

app.set("view engine", "ejs");

app.use(auth(config));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.use("/", Router);

app.listen(process.env.PORT, () => {
  console.log(`Port Connected at ${process.env.PORT}`);
});
