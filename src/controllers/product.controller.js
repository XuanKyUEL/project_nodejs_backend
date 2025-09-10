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

  publishedProductByShop = async (req, res, next) => {
    try {
      const result = await ProductService.publishProductByShop({
        product_shop: req.user.userId,
        productId: req.params.id
      });
      new SuccessResponse({
        message: "Product published successfully",
        metadata: result
      }).send(res);
    } catch (error) {
      console.error("Error in publishedProductByShop controller:", error);
      next(error);
    }
  }
  // QUERY //
  /**
   * Get all draft products for a specific shop
   * @param {Number} limit
   * @param {JSON} res
   * @param {*} next
   */
  
  getAllDraftsForShop = async (req, res, next) => {
    try {
      const result = await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId
      });
      new SuccessResponse({
        message: "Draft products retrieved successfully",
        metadata: result
      }).send(res);
    } catch (error) {
      console.error("Error in getAllDraftsForShop controller:", error);
      next(error);
    }
  }

  getAllPublishedForShop = async (req, res, next) => {
    try {
      const result = await ProductService.findAllPublishedForShop({
        product_shop: req.user.userId
      });
      new SuccessResponse({
        message: "Published products retrieved successfully",
        metadata: result
      }).send(res);
    } catch (error) {
      console.error("Error in getAllPublishedForShop controller:", error);
      next(error);
    }
  }
  // END QUERY //
}
module.exports = new ProductController();
