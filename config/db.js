const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.LOG_DB}@cluster0.8cpci.mongodb.net/ecommercePerso`
  )
  .then(() => console.log("Connect to MongoDb"))
  .catch((err) => console.log("Failed to connect MongoDb", err));
