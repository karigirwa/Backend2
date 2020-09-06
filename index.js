const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./signin/routes/user");
const blog = require("./controller/blogs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");



//connect()
// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/updates2", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connection has failed");
  });
  app.get('/', (req, res) => {
    res.json({"message": "Welcome to Backend. "});
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
 
app.use("/", blog);
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;
 app.listen(port, () => {
     console.log(`Server is listening on port ${port}....`);
 });