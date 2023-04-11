const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const { connect } = require("./DB/config");
const { Router } = require("./Routes/routes");

connect();

app.use(express.json());

app.use(express.static("public"));

app.use("/", Router);

app.listen(process.env.PORT, () => {
  console.log(`Port Connected at ${process.env.PORT}`);
});

//         app.set('view engine','ejs')
//         app.use(bodyParser.urlencoded({ extended: true }))
//         app.use(bodyParser.json())
