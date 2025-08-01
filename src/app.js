require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

// Init middleware
// app.use(morgan("tiny")); // Use 'tiny' for minimal output
// app.use(morgan("short")); // Use 'short' for concise output
// app.use(morgan("combined")); // Use 'combined' for standard Apache combined log output
// app.use(morgan("common")); // Use 'common' for standard Apache common log output
app.use(morgan("dev")); // Use 'dev' for concise output colored by response status
app.use(helmet()); // Use helmet for security headers
app.use(compression()); // Use compression for gzip compression
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// console.log("Process ID:", process.env);

// Init db
// require("./dbs/init.mongodb.lv0");
require("./databases/init.mongodb");
// const { countConnect } = require("./helpers/check_connect");
// countConnect();
// Init routes
// app.get("/", (req, res) => {
//   const strCompression = "This is a test string to demonstrate compression.";
//   return res.status(500).json({
//     message: "Welcome to WSV eCommerce API",
//     // metaData: strCompression.repeat(10000),
//   });
// });
// Init routes
app.use("/", require("./routes/index"));
// Handle error

module.exports = app;
