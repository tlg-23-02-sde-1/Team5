const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("Established connection with the DB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connect,
};
