"use strict";

const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");


// Authentication //
router.use(authentication)

// Product routes
router.post("/create-product", asyncHandler(ProductController.createProduct));

module.exports = router;
