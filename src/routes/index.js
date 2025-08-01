"use strict";

const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the WSV eCommerce API",
//   });
// });
router.use("/v1/api", require("./access"));

module.exports = router;
