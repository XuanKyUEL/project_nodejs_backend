"use strict";

const ProductService = require("../services/product.service");
const { Created, SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    console.log("Creating product with payload:", req.body);
    new SuccessResponse({
      message: "Product created successfully",
      metadata: await ProductService.createProduct(req.body.product_type, req.body)
    }).send(res);
  }
}

module.exports = new ProductController();
