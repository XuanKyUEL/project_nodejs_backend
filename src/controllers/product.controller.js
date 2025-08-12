"use strict";

const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
  //   try {
  //     console.log("=== CREATE PRODUCT CONTROLLER START ===");
  //     console.log("Request body:", JSON.stringify(req.body, null, 2));
  //     console.log("User ID:", req.user?.userId);
  //     console.log("Product type:", req.body.product_type);
      
  //     const productData = {
  //       ...req.body,
  //       product_shop: req.user.userId
  //     };
      
  //     console.log("Final product data:", JSON.stringify(productData, null, 2));
  //     console.log("Calling ProductService.createProduct...");
      
  //     const result = await ProductService.createProduct(req.body.product_type, productData);
      
  //     console.log("Product created successfully:", result);
      
  //     new SuccessResponse({
  //       message: "Product created successfully",
  //       metadata: result
  //     }).send(res);
      
  //     console.log("=== CREATE PRODUCT CONTROLLER END ===");
  //   } catch (error) {
  //     console.error("Error in createProduct controller:", error);
  //     next(error);
  //   }
  // }
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
