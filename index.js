const express = require("express");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//routes

const userRoute = require("./routes/user.rte");
const authRoute = require("./routes/auth.rte");

app.use("/api/user", userRoute).use("/api/auth", authRoute);

//server
app.listen(8080, () => {
  console.log("Listening on port : 8080");
});
