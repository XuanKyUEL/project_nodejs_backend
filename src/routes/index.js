"use strict";

const express = require("express");
const { route } = require("./access");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// Routes that don't require API key (for creating API keys)
router.use("/v1/api/apikey", require("./apikey"));

//check API Key for protected routes
router.use(apiKey);

// Check permissions for specific routes
router.use(permission("READ")); // Example: apply READ permission to all routes after this point

router.use("/v1/api", require("./access"));

module.exports = router;
