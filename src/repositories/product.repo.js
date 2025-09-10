'use strict'

const { Types } = require("mongoose");
const { product, electronics, furniture, clothing } = require("../models/product.model")

const findAllDraftsForShop = async({ query, limit , skip }) => {
    return await queryProduct({ query, limit, skip });
}

const findAllPublishedForShop = async({ query, limit , skip }) => {
    return await queryProduct({ query, limit, skip });
}

const queryProduct = async ({ query, limit, skip }) => {
    return await product.find(query).populate('product_shop', 'name email -_id').sort({ updateAt: -1 }).skip(skip).limit(limit).lean().exec();
}

const publishProductByShop = async ({
    product_shop,
    productId
}) => {
    const foundShop = await product.findOne({
        _id: new Types.ObjectId(productId),
        product_shop: new Types.ObjectId(product_shop)
    })
    if (!foundShop) return null

    foundShop.isDraft = false
    foundShop.isPublished = true

    const { modifiedCount } = await foundShop.updateOne(foundShop)

    return modifiedCount > 0 ? foundShop : null;
}

module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishedForShop
}
