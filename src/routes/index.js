"use strict";

const express = require("express");
const { route } = require("./access");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// Routes that don't require API key (public routes)
router.use("/v1/api/apikey", require("./apikey"));
router.use("/v1/api/product", require("./product"));// Product routes can be public or protected based on your design


router.use("/v1/api", require("./access")); // Login/signup should be public
//check API Key for protected routes
router.use(apiKey);

// Check permissions for specific routes
router.use(permission("READ")); // Example: apply READ permission to all routes after this point

// Add other protected routes here if needed

module.exports = router;
