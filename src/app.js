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

// Init db

// Init routes
app.get("/", (req, res) => {
  const strCompression = "This is a test string to demonstrate compression.";
  return res.status(500).json({
    message: "Welcome to WSV eCommerce API",
    metaData: strCompression.repeat(10000),
  });
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
