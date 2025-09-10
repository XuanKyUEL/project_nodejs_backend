"use strict";

const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
  try {
    const productData = {
      ...req.body,
      product_shop: req.user.userId
    };
    const result = await ProductService.createProduct(req.body.product_type, productData);
    new SuccessResponse({
      message: "Product created successfully",
      metadata: result
    }).send(res);
  } catch (error) {
    console.error("Error in createProduct controller:", error);
    next(error);
  } 
}
}

module.exports = new ProductController();
