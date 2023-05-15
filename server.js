const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require("dotenv").config();
const { connect } = require("./DB/config");
const { Router } = require("./Routes/routes");
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

connect();

app.set("view engine", "ejs");

app.use(auth(config));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

function attachIO(req, res, next) {
  req.io = io;
  next();
}

app.use(attachIO);

app.use("/", Router);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
});

server.listen(process.env.PORT, () => {
  console.log(`Port Connected at ${process.env.PORT}`);
});
