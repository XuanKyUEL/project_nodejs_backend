'use strict'

const shopModels = require("../models/shop.models")

const findByEmail = async (email) => {
  // Find shop by email
  const shop = await shopModels.findOne({ email }).lean();
  return shop;
}

module.exports = {
    findByEmail
}
