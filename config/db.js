const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://BriceLibert:LaithiBrice1903@cluster0.8cpci.mongodb.net/stackOverFlou`
  )
  .then(() => console.log("Connect to MongoDb"))
  .catch((err) => console.log("Failed to connect MongoDb", err));
